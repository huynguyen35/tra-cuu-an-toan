const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const penaltyFilter = document.getElementById("penaltyFilter");
const resultList = document.getElementById("resultList");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const clearBtn = document.getElementById("clearBtn");
const sortSelect = document.getElementById("sortSelect");
const pageSizeSelect = document.getElementById("pageSize");
const paginationTop = document.getElementById("pagination");
const paginationBottom = document.getElementById("paginationBottom");
let currentPage = 1;

// Calculator elements/state
const calculatorItemsEl = document.getElementById("calculatorItems");
const employeeTotalEl = document.getElementById("employeeTotal");
const managerTotalEl = document.getElementById("managerTotal");
const grandTotalEl = document.getElementById("grandTotal");
const clearCalculatorBtn = document.getElementById("clearCalculator");
const selectedForCalculation = new Map();

function normalizeText(text) {
    return String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .trim();
}
function formatMoney(amount) {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VNĐ";
}
function toAmount(value) {
    const parsed = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}
function loadCategories() {
    const categories = [];
    violations.forEach(item => {
        if (!categories.some(c => c.id === item.category)) {
            categories.push({ id: item.category, name: item.categoryName });
        }
    });
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categoryFilter.appendChild(option);
    });
}
function getPenaltyDisplay(item) {
    if (item.penaltyType === "fixed" && item.penalty !== null && item.penalty !== undefined) {
        return `<div class="penalty">${formatMoney(item.penalty)}<span class="penalty-label">MỨC PHẠT THEO VĂN KIỆN</span></div>`;
    }
    if (item.penaltyText) {
        return `<div class="no-fixed-penalty"><span class="penalty-label">HÌNH THỨC XỬ LÝ THEO VĂN KIỆN</span><div class="penalty-text">${escapeHTML(item.penaltyText)}</div></div>`;
    }
    return `<div class="no-fixed-penalty">Cần đối chiếu văn kiện</div>`;
}
function isManualMoneyAllowed(item) {
    // Không mở ô nhập tiền cho xử lý thuần kỷ luật/administrative.
    return item.penaltyType === "risk_assessment" || item.penaltyType === "pending";
}
function createCard(item) {
    const repeat = item.repeatPenalty || "Chưa có thông tin riêng.";
    const manager = item.managerLiability
        ? "Có quy định trách nhiệm liên đới chung; cần xét tình huống cụ thể."
        : "Chưa xác định trách nhiệm liên đới.";
    const added = selectedForCalculation.has(String(item.id));
    return `
        <article class="result-card">
            <div class="card-top"><div>
                <div class="violation-name">${escapeHTML(item.name)}</div>
                <span class="category-tag">${escapeHTML(item.categoryName)}</span>
            </div>${getPenaltyDisplay(item)}</div>
            <div class="description">${escapeHTML(item.description)}</div>
            <div class="card-details">
                <div class="detail-item"><span>Điều khoản văn kiện</span><strong>${escapeHTML(item.article)}</strong></div>
                <div class="detail-item"><span>Mã vi phạm</span><strong>${escapeHTML(item.id)}</strong></div>
            </div>
            <div class="extra-note"><strong>Tái phạm:</strong> ${escapeHTML(repeat)}</div>
            <div class="extra-note"><strong>Trách nhiệm quản lý:</strong> ${escapeHTML(manager)}</div>
            <button type="button" class="add-to-calculator ${added ? "is-added" : ""}" data-violation-id="${escapeHTML(item.id)}" ${added ? "disabled" : ""}>
                ${added ? "✓ Đã thêm vào bảng tính" : "+ Thêm vào bảng tính"}
            </button>
        </article>`;
}
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
}
function filterViolations(resetPage = true) {
    if (resetPage) currentPage = 1;
    const keyword = normalizeText(searchInput.value);
    const selectedCategory = categoryFilter.value;
    const selectedPenalty = penaltyFilter.value;
    let filtered = violations.filter(item => {
        const searchableText = normalizeText([
            item.id, item.name, item.description, item.categoryName, item.article,
            ...(item.keywords || [])
        ].join(" "));
        return (keyword === "" || searchableText.includes(keyword)) &&
            (selectedCategory === "all" || item.category === selectedCategory) &&
            (selectedPenalty === "all" || item.penaltyType === selectedPenalty);
    });
    const sortMode = sortSelect ? sortSelect.value : "default";
    const penaltyValue = item => item.penaltyType === "fixed" && item.penalty != null ? Number(item.penalty) || 0 : Number.POSITIVE_INFINITY;
    if (sortMode === "name-asc") filtered.sort((a,b) => String(a.name).localeCompare(String(b.name), "vi"));
    if (sortMode === "name-desc") filtered.sort((a,b) => String(b.name).localeCompare(String(a.name), "vi"));
    if (sortMode === "penalty-asc") filtered.sort((a,b) => penaltyValue(a) - penaltyValue(b));
    if (sortMode === "penalty-desc") filtered.sort((a,b) => penaltyValue(b) - penaltyValue(a));
    if (sortMode === "category") filtered.sort((a,b) => String(a.categoryName).localeCompare(String(b.categoryName), "vi") || String(a.name).localeCompare(String(b.name), "vi"));
    if (sortMode === "article") filtered.sort((a,b) => String(a.article).localeCompare(String(b.article), "vi", {numeric:true}));
    resultCount.textContent = filtered.length;
    if (filtered.length === 0) {
        resultList.innerHTML = "";
        emptyState.classList.remove("hidden");
        renderPagination(0, 1, 0);
        return;
    }
    emptyState.classList.add("hidden");
    const pageSize = Number(pageSizeSelect?.value || 20);
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    currentPage = Math.min(Math.max(currentPage, 1), totalPages);
    const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    resultList.innerHTML = pageItems.map(createCard).join("");
    renderPagination(filtered.length, totalPages, pageSize);
}
function renderPagination(totalItems, totalPages, pageSize) {
    const start = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
    const end = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0;
    const pageButtons = [];
    const addButton = (label, page, disabled = false, active = false) => `<button type="button" class="page-btn ${active ? "active" : ""}" data-page="${page}" ${disabled ? "disabled" : ""}>${label}</button>`;
    pageButtons.push(addButton("‹", currentPage - 1, currentPage <= 1));
    const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
    let last = 0;
    [...pages].filter(p => p >= 1 && p <= totalPages).sort((a,b)=>a-b).forEach(p => {
        if (last && p - last > 1) pageButtons.push(`<span class="page-ellipsis">…</span>`);
        pageButtons.push(addButton(p, p, false, p === currentPage)); last = p;
    });
    pageButtons.push(addButton("›", currentPage + 1, currentPage >= totalPages));
    const markup = `<span class="page-info">${start}-${end} / ${totalItems}</span><div class="page-buttons">${pageButtons.join("")}</div>`;
    [paginationTop, paginationBottom].forEach(nav => { if (nav) nav.innerHTML = markup; });
}
function handlePaginationClick(event) {
    const btn = event.target.closest("[data-page]");
    if (!btn || btn.disabled) return;
    currentPage = Number(btn.dataset.page) || 1;
    filterViolations(false);
    resultList.scrollIntoView({behavior:"smooth", block:"start"});
}


// Add a violation from search results to the separate calculation table.
resultList.addEventListener("click", event => {
    const button = event.target.closest(".add-to-calculator");
    if (!button) return;
    const id = String(button.dataset.violationId);
    const item = violations.find(v => String(v.id) === id);
    if (!item || selectedForCalculation.has(id)) return;
    selectedForCalculation.set(id, {
        item,
        employeeManual: "",
        managerManual: ""
    });
    renderCalculator();
    filterViolations();
});
function renderCalculator() {
    if (selectedForCalculation.size === 0) {
        calculatorItemsEl.innerHTML = `<p class="calculator-empty">Chưa có lỗi nào. Nhấn “Thêm vào bảng tính” ở kết quả tra cứu.</p>`;
        updateTotals();
        return;
    }
    calculatorItemsEl.innerHTML = Array.from(selectedForCalculation.entries()).map(([id, row]) => {
        const item = row.item;
        const fixed = item.penaltyType === "fixed" && item.penalty !== null && item.penalty !== undefined;
        const employeeAmount = fixed ? Number(item.penalty) || 0 : toAmount(row.employeeManual);
        const manualAllowed = !fixed && isManualMoneyAllowed(item);
        return `
            <div class="calculator-row" data-calculator-id="${escapeHTML(id)}">
                <div class="calculator-row-title"><div><strong>${escapeHTML(item.name)}</strong><small>${escapeHTML(item.article || "")} · ${escapeHTML(item.id)}</small></div><button type="button" class="remove-calculator-item" data-remove-id="${escapeHTML(id)}" aria-label="Xóa lỗi này">×</button></div>
                <div class="calculator-input-grid">
                    <label class="calc-input-label">Tiền phạt nhân viên
                        ${fixed ? `<input class="employee-amount" type="text" readonly value="${employeeAmount}" aria-label="Tiền phạt nhân viên">` : manualAllowed ? `<input class="employee-amount" type="number" min="0" step="1000" inputmode="numeric" value="${escapeHTML(row.employeeManual)}" placeholder="Nhập tiền phạt" aria-label="Tiền phạt nhân viên">` : `<div class="calc-no-money">${escapeHTML(item.penaltyText || "Không có mức phạt tiền cố định")}</div>`}
                    </label>
                    ${item.managerLiability ? `<label class="calc-input-label">Tiền liên đới quản lý<input class="manager-amount" type="number" min="0" step="1000" inputmode="numeric" value="${escapeHTML(row.managerManual)}" placeholder="Nhập khoản liên đới (nếu có)"></label>` : `<div class="calc-input-label manager-not-applicable">Không có khoản liên đới quản lý được đánh dấu</div>`}
                </div>
                <div class="calculator-row-total">Tạm tính lỗi này: <strong>${formatMoney(employeeAmount + toAmount(row.managerManual))}</strong></div>
            </div>`;
    }).join("");
    updateTotals();
}
function updateTotals() {
    let employeeTotal = 0;
    let managerTotal = 0;
    selectedForCalculation.forEach(row => {
        const item = row.item;
        if (item.penaltyType === "fixed" && item.penalty !== null && item.penalty !== undefined) employeeTotal += Number(item.penalty) || 0;
        else if (isManualMoneyAllowed(item)) employeeTotal += toAmount(row.employeeManual);
        managerTotal += toAmount(row.managerManual);
    });
    employeeTotalEl.textContent = formatMoney(employeeTotal);
    managerTotalEl.textContent = formatMoney(managerTotal);
    grandTotalEl.textContent = formatMoney(employeeTotal + managerTotal);
}
calculatorItemsEl.addEventListener("input", event => {
    const rowEl = event.target.closest(".calculator-row");
    if (!rowEl) return;
    const id = rowEl.dataset.calculatorId;
    const row = selectedForCalculation.get(id);
    if (!row) return;
    if (event.target.classList.contains("employee-amount")) row.employeeManual = event.target.value;
    if (event.target.classList.contains("manager-amount")) row.managerManual = event.target.value;
    const employeeAmount = row.item.penaltyType === "fixed" && row.item.penalty !== null && row.item.penalty !== undefined
        ? (Number(row.item.penalty) || 0)
        : (isManualMoneyAllowed(row.item) ? toAmount(row.employeeManual) : 0);
    const rowTotalEl = rowEl.querySelector(".calculator-row-total strong");
    if (rowTotalEl) rowTotalEl.textContent = formatMoney(employeeAmount + toAmount(row.managerManual));
    updateTotals();
});
calculatorItemsEl.addEventListener("click", event => {
    const removeButton = event.target.closest(".remove-calculator-item");
    if (!removeButton) return;
    selectedForCalculation.delete(String(removeButton.dataset.removeId));
    renderCalculator();
    filterViolations();
});
clearCalculatorBtn.addEventListener("click", () => {
    selectedForCalculation.clear();
    renderCalculator();
    filterViolations();
});
searchInput.addEventListener("input", () => filterViolations(true));
categoryFilter.addEventListener("change", () => filterViolations(true));
penaltyFilter.addEventListener("change", () => filterViolations(true));
if (sortSelect) sortSelect.addEventListener("change", () => filterViolations(true));
if (pageSizeSelect) pageSizeSelect.addEventListener("change", () => filterViolations(true));
if (paginationTop) paginationTop.addEventListener("click", handlePaginationClick);
if (paginationBottom) paginationBottom.addEventListener("click", handlePaginationClick);
clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "all";
    penaltyFilter.value = "all";
    filterViolations();
    searchInput.focus();
});
loadCategories();
renderCalculator();
filterViolations();
