// ======================================================
// DATA TRA CỨU VI PHẠM AN TOÀN
// Văn kiện: VP-AS-A-PMES-001
// Phiên bản 01 - Sửa đổi lần 3
// Ban hành: 10/10/2025
// Hiệu lực: 17/10/2025
// ======================================================

const regulationInfo = {
    code: "VP-AS-A-PMES-001",
    title: "Quy định quản lý thưởng phạt an toàn sản xuất",
    version: "Phiên bản 01 - Sửa đổi lần 3",
    issuedDate: "2025-10-10",
    effectiveDate: "2025-10-17",
    company: "Công ty TNHH Sailun Việt Nam"
};

const violations = [];

function addViolation(article, category, categoryName, rows) {
    rows.forEach((row, index) => {
        const amount = typeof row.penalty === "number" ? row.penalty : null;

        violations.push({
            id: `${article.replaceAll(".", "_")}_${String(index + 1).padStart(3, "0")}`,
            category,
            categoryName,
            name: row.name,
            description: row.description || row.name,
            penalty: amount,
            penaltyType: amount !== null ? "fixed" : "text",
            penaltyText: row.penaltyText || (amount !== null
                ? `${amount.toLocaleString("vi-VN")} VNĐ`
                : "Cần đánh giá theo quy định trong văn kiện"),
            article,
            item: row.item || index + 1,
            repeatPenalty: row.repeatPenalty || "Áp dụng nguyên tắc xử lý tái phạm tại mục 7.1.1.2 nếu thuộc trường hợp tái phạm.",
            managerLiability: true,
            keywords: row.keywords || []
        });
    });
}

// ------------------------------------------------------
// 7.1.4.1 - CÁC HÀNH VI VI PHẠM NGHIÊM TRỌNG
// ------------------------------------------------------

addViolation("7.1.4.1", "serious", "Hành vi vi phạm nghiêm trọng", [
    {
        name: "Không có chứng chỉ vận hành thiết bị đặc chủng hoặc làm công việc đặc chủng",
        description: "Thao tác thiết bị đặc chủng hoặc thực hiện công việc đặc chủng khi không có chứng chỉ. Bao gồm lái xe nâng, vận hành thang máy, bình áp lực và đường ống, hàn cắt kim loại, vận hành nồi hơi và công việc điện.",
        penaltyText: "Chấm dứt hợp đồng lao động",
        keywords: ["chứng chỉ", "xe nâng", "thang máy", "hàn", "điện", "nồi hơi"]
    },
    {
        name: "Thực hiện công việc nguy cơ cao khi chưa được phê duyệt",
        description: "Công việc nguy cơ cao chưa thực hiện quy trình phê duyệt an toàn. Bao gồm công việc hàn cắt phát sinh lửa, làm việc trên cao, không gian hạn chế, điện tạm thời, đào đất, nâng cẩu và tháo lắp mặt bích.",
        penaltyText: "Chấm dứt hợp đồng lao động",
        keywords: ["nguy cơ cao", "phê duyệt", "hàn cắt", "trên cao", "không gian hạn chế", "nâng cẩu"]
    },
    {
        name: "Làm việc trên cao không đội mũ bảo hộ hoặc không sử dụng dây an toàn",
        description: "Làm việc tại độ cao từ 2 mét trở lên so với mặt đất, có nguy cơ rơi ngã, nhưng không đội mũ bảo hộ hoặc không thắt dây an toàn.",
        penaltyText: "Chấm dứt hợp đồng lao động",
        keywords: ["trên cao", "dây an toàn", "mũ bảo hộ", "rơi ngã"]
    },
    {
        name: "Không thực hiện LOTO hoặc tự ý vận hành thiết bị đã dừng máy",
        description: "Không thực hiện quy định dừng máy, khóa máy, treo thẻ; tự ý vận hành thiết bị đã ngắt điện, đã khóa hoặc đã treo bảng dừng máy.",
        penaltyText: "Chấm dứt hợp đồng lao động",
        keywords: ["LOTO", "dừng máy", "khóa máy", "treo thẻ", "tự ý vận hành"]
    },
    {
        name: "Cố ý vô hiệu hóa hoặc làm hỏng thiết bị an toàn",
        description: "Cố ý che chắn, làm hỏng thiết bị bảo vệ an toàn hoặc cố tình tránh né thiết bị bảo vệ để đi vào khu vực nguy hiểm.",
        penaltyText: "Chấm dứt hợp đồng lao động",
        keywords: ["vô hiệu hóa", "thiết bị an toàn", "che chắn", "làm hỏng", "bypass"]
    },
    {
        name: "Tự ý sử dụng thiết bị chưa được nghiệm thu an toàn",
        description: "Chưa được phép nhưng tự ý sử dụng thiết bị chưa qua nghiệm thu an toàn.",
        penaltyText: "Chấm dứt hợp đồng lao động",
        keywords: ["nghiệm thu", "thiết bị", "tự ý sử dụng"]
    },
    {
        name: "Làm việc sau khi uống rượu bia hoặc hút thuốc tại khu vực cấm",
        description: "Đi làm sau khi uống rượu bia hoặc hút thuốc tại khu vực có quy định cấm hút thuốc.",
        penaltyText: "Chấm dứt hợp đồng lao động",
        keywords: ["rượu bia", "say rượu", "hút thuốc", "khu vực cấm"]
    },
    {
        name: "Ba vi phạm gây ra tai nạn an toàn",
        description: "Thao tác trái quy định, chỉ huy trái quy định hoặc vi phạm kỷ luật lao động dẫn đến tai nạn sản xuất hoặc sự cố suýt gây tai nạn.",
        penaltyText: "Chấm dứt hợp đồng lao động",
        keywords: ["ba vi phạm", "vi phạm thao tác", "vi phạm chỉ huy", "tai nạn"]
    },
    {
        name: "Che giấu hoặc không báo cáo tai nạn mất thời gian làm việc",
        description: "Che giấu, không khai báo tai nạn gây mất thời gian làm việc từ 1 ngày trở lên.",
        penaltyText: "Chấm dứt hợp đồng lao động",
        keywords: ["che giấu tai nạn", "không báo cáo", "mất thời gian làm việc"]
    },
    {
        name: "Hành vi không an toàn ngoài công ty bị xử phạt hành chính",
        description: "Các hành vi như lái xe khi say rượu, đánh nhau, trộm cắp hoặc hành vi khác bị cơ quan công an xử phạt hành chính.",
        penaltyText: "Xử lý theo quy định xử phạt hành chính được nêu trong văn kiện.",
        keywords: ["ngoài công ty", "say rượu", "đánh nhau", "trộm cắp", "công an"]
    }
]);

// ------------------------------------------------------
// 7.1.4.2 - HÀNH VI KHÔNG AN TOÀN
// ------------------------------------------------------

addViolation("7.1.4.2", "unsafe", "Hành vi không an toàn", [
    {
        name: "Sử dụng điện thoại hoặc thiết bị điện tử tại nơi dễ cháy nổ",
        description: "Sử dụng điện thoại di động hoặc thiết bị điện tử tại nơi dễ cháy nổ hoặc nơi đặc biệt nguy hiểm.",
        penalty: 200000,
        keywords: ["điện thoại", "thiết bị điện tử", "cháy nổ"]
    },
    {
        name: "Dừng lại hoặc đi qua bên dưới vật thể, hàng hóa có nguy cơ nghiêng đổ",
        penalty: 200000,
        keywords: ["vật nghiêng đổ", "hàng hóa", "bên dưới"]
    },
    {
        name: "Để bộ phận cơ thể ở phía dưới hoặc vị trí dễ bị va đập, kẹp khi di chuyển vật",
        penalty: 200000,
        keywords: ["di chuyển vật", "kẹp", "va đập"]
    },
    {
        name: "Chạy nhảy, đuổi bắt hoặc đùa giỡn trong khu vực sản xuất",
        penalty: 100000,
        keywords: ["chạy nhảy", "đuổi bắt", "đùa giỡn"]
    },
    {
        name: "Sử dụng ống dẫn khí không đúng quy định, dùng ống khí thổi người",
        penalty: 100000,
        keywords: ["ống khí", "khí nén", "thổi người"]
    },
    {
        name: "Sử dụng dụng cụ sắc nhọn hướng về phía cơ thể hoặc đặt sai vị trí",
        penalty: 100000,
        keywords: ["dao", "vật sắc nhọn", "dụng cụ"]
    },
    {
        name: "Không có biện pháp bảo vệ, cảnh báo hoặc cách ly tại lỗ, hố, rãnh",
        penalty: 100000,
        keywords: ["lỗ", "hố", "rãnh", "cảnh báo", "rào chắn"]
    },
    {
        name: "Sạc điện thoại hoặc pin dự phòng trong tủ máy tính, tủ điều khiển",
        penalty: 100000,
        keywords: ["sạc điện thoại", "pin dự phòng", "tủ điều khiển"]
    },
    {
        name: "Lấy vật dụng từ giữa hoặc phía dưới chồng hàng",
        penalty: 100000,
        keywords: ["chồng hàng", "rút hàng", "lấy vật dụng"]
    },
    {
        name: "Xếp hàng cao trên 1,5 mét không có cảnh báo hoặc biện pháp cố định",
        penalty: 100000,
        keywords: ["1,5 mét", "xếp chồng", "cố định", "cảnh báo"]
    },
    {
        name: "Không kiểm tra an toàn và bảo dưỡng thiết bị, phương tiện theo quy định",
        penalty: 100000,
        keywords: ["kiểm tra", "bảo dưỡng", "thiết bị", "phương tiện"]
    },
    {
        name: "Đặt cốc nước trên tủ điện hoặc đặt chất dễ cháy trong tủ điện",
        penalty: 100000,
        keywords: ["cốc nước", "tủ điện", "chất dễ cháy"]
    },
    {
        name: "Đẩy dụng cụ thô bạo gây va đập thiết bị hoặc người",
        penalty: 100000,
        keywords: ["đẩy dụng cụ", "va đập", "thiết bị"]
    },
    {
        name: "Người hoặc phương tiện không đi theo tuyến đường quy định",
        penalty: 100000,
        keywords: ["sai tuyến", "đi sai đường", "người đi bộ"]
    },
    {
        name: "Tùy ý dựa tay hoặc bộ phận cơ thể vào thiết bị khi sản xuất",
        penalty: 100000,
        keywords: ["dựa vào máy", "thiết bị", "cơ thể"]
    },
    {
        name: "Dụng cụ an toàn không được đặt đúng vị trí",
        penalty: 100000,
        keywords: ["dụng cụ an toàn", "đặt sai vị trí"]
    },
    {
        name: "Không sắp xếp đúng vị trí và phân loại dụng cụ, BHLĐ, chất thải nguy hại",
        penalty: 100000,
        keywords: ["BHLĐ", "chất thải nguy hại", "sắp xếp"]
    },
    {
        name: "Va đập làm biến dạng hoặc hư hỏng thiết bị bảo vệ an toàn",
        penalty: 100000,
        keywords: ["thiết bị bảo vệ", "hư hỏng", "biến dạng"]
    },
    {
        name: "Sử dụng trái quy định quạt điện công nghiệp di động",
        penalty: 100000,
        keywords: ["quạt công nghiệp", "quạt di động"]
    },
    {
        name: "Không treo biển cảnh báo, biển báo sai quy cách hoặc biển báo bị hỏng",
        penalty: 100000,
        keywords: ["biển cảnh báo", "biển báo", "hư hỏng"]
    },
    {
        name: "Tự ý đi qua cửa cấm hoặc không đi theo tuyến đường chỉ định",
        penalty: 100000,
        keywords: ["cửa cấm", "tuyến đường"]
    },
    {
        name: "Vận hành thiết bị đặc chủng hoặc làm công việc đặc chủng không có giấy phép nội bộ",
        penalty: 100000,
        keywords: ["thiết bị đặc chủng", "giấy phép nội bộ"]
    },
    {
        name: "Dừng lại hoặc đi qua bên dưới vật thể hoặc hàng hóa có nguy cơ nghiêng đổ",
        penalty: 100000,
        keywords: ["vật nghiêng", "hàng hóa", "bên dưới"]
    },
    {
        name: "Vừa đi bộ trong khu vực sản xuất vừa nhìn điện thoại",
        penalty: 100000,
        keywords: ["đi bộ", "điện thoại"]
    },
    {
        name: "Sử dụng điện thoại khi kéo dụng cụ hoặc vận hành thiết bị",
        penalty: 100000,
        keywords: ["điện thoại", "kéo dụng cụ", "vận hành"]
    },
    {
        name: "Không thực hiện đúng kiểm tra an toàn, phản hồi và báo cáo nguy cơ",
        penalty: 100000,
        keywords: ["kiểm tra an toàn", "phản hồi", "báo cáo nguy cơ"]
    },
    {
        name: "Không hạ barie theo yêu cầu khi thực hiện dỡ hàng",
        penalty: 100000,
        keywords: ["barie", "dỡ hàng"]
    },
    {
        name: "Đưa tay trực tiếp vào phễu cấp liệu máy đùn khi không sử dụng dụng cụ an toàn",
        penalty: 100000,
        keywords: ["máy đùn", "phễu cấp liệu", "tay"]
    },
    {
        name: "Không đi theo lối thao tác chính quy",
        penalty: 100000,
        keywords: ["lối thao tác", "đường đi"]
    },
    {
        name: "Tự ý vượt barie đi vào khu vực dỡ hàng",
        penalty: 100000,
        keywords: ["barie", "khu vực dỡ hàng"]
    },
    {
        name: "Lỗ, hố, rãnh tại hiện trường không có biện pháp bảo vệ, cảnh báo hoặc rào chắn",
        penalty: 200000,
        keywords: ["lỗ", "hố", "rãnh", "rào chắn"]
    },
    {
        name: "Sạc điện thoại hoặc pin dự phòng trong tủ máy tính, tủ thao tác",
        penalty: 100000,
        keywords: ["sạc điện thoại", "pin dự phòng", "tủ máy"]
    },
    {
        name: "Không bố trí đúng vị trí và phân loại dụng cụ, BHLĐ, chất thải nguy hại",
        penalty: 100000,
        keywords: ["dụng cụ", "BHLĐ", "chất thải"]
    },
    {
        name: "Không đặt dụng cụ an toàn đúng vị trí quy định",
        penalty: 100000,
        keywords: ["dụng cụ an toàn", "vị trí"]
    },
    {
        name: "Không tránh né xe AGV trong phạm vi đường chạy của xe",
        penalty: 200000,
        keywords: ["AGV", "xe tự hành", "đường chạy"]
    },
    {
        name: "Đeo tai nghe Bluetooth trong khu vực sản xuất",
        penalty: 100000,
        keywords: ["Bluetooth", "tai nghe"]
    },
    {
        name: "Các hành vi khác có thể trực tiếp gây thương tích, cháy, nổ, sập đổ hoặc ngộ độc",
        penaltyText: "Áp dụng mức phạt theo kết quả đánh giá mức độ rủi ro của hành vi không an toàn.",
        keywords: ["đánh giá rủi ro", "cháy nổ", "ngộ độc", "hành vi khác"]
    }
]);

// ------------------------------------------------------
// 7.1.4.3 - TRANG BỊ BẢO HỘ LAO ĐỘNG
// ------------------------------------------------------

addViolation("7.1.4.3", "ppe", "Trang bị bảo hộ lao động", [
    {
        name: "Không mang giày bảo hộ chống va đập khi vào khu vực sản xuất",
        penalty: 100000,
        keywords: ["giày bảo hộ", "giày chống va đập"]
    },
    {
        name: "Không đội mũ bảo hộ hoặc không cài quai mũ",
        penalty: 100000,
        keywords: ["mũ bảo hộ", "nón bảo hộ", "quai mũ"]
    },
    {
        name: "Không đội mũ hàn khi hàn kim loại hoặc không đeo kính khi cắt, mài",
        penalty: 100000,
        keywords: ["mũ hàn", "kính bảo hộ", "cắt", "mài"]
    },
    {
        name: "Đeo găng tay khi thao tác tại bộ phận quay",
        description: "Đeo găng tay khi làm việc tại các vị trí có bộ phận quay như máy tiện, máy khoan, cuộn trục.",
        penalty: 100000,
        keywords: ["găng tay", "bộ phận quay", "máy tiện", "máy khoan"]
    },
    {
        name: "Nữ nhân viên không đội mũ hoặc không buộc tóc dài gọn trong mũ",
        penalty: 100000,
        keywords: ["nữ nhân viên", "tóc dài", "mũ"]
    },
    {
        name: "Không mặc quần áo lao động hoặc không thực hiện quy định ba kín",
        penalty: 100000,
        keywords: ["quần áo lao động", "ba kín", "đồng phục"]
    },
    {
        name: "Cố ý làm hỏng hoặc thay đổi mục đích sử dụng đồ bảo hộ lao động",
        penalty: 100000,
        keywords: ["làm hỏng BHLĐ", "đồ bảo hộ", "sử dụng sai"]
    },
    {
        name: "Không đeo thiết bị bảo vệ thính giác tại vị trí có tiếng ồn",
        penalty: 100000,
        keywords: ["nút tai", "chống ồn", "bảo vệ thính giác"]
    },
    {
        name: "Không đeo khẩu trang hoặc đeo không đúng quy cách",
        penalty: 100000,
        keywords: ["khẩu trang", "BHLĐ"]
    },
    {
        name: "Không đeo ống tay chống cắt tại vị trí được cấp phát",
        penalty: 100000,
        keywords: ["ống tay chống cắt", "chống cắt"]
    },
    {
        name: "Không đeo găng tay chống cắt tại vị trí được cấp phát",
        penalty: 100000,
        keywords: ["găng tay chống cắt", "chống cắt"]
    },
    {
        name: "Các trường hợp khác không mang hoặc mang trang bị bảo hộ lao động không đúng quy cách",
        penaltyText: "Áp dụng mức phạt theo kết quả đánh giá mức độ rủi ro của hành vi không an toàn.",
        keywords: ["BHLĐ", "bảo hộ lao động", "đánh giá rủi ro"]
    }
]);
// ------------------------------------------------------
// 7.1.4.4 - VI PHẠM PHƯƠNG TIỆN, XE NÂNG, XE ĐIỆN
// ------------------------------------------------------

addViolation("7.1.4.4", "vehicle", "Phương tiện, xe nâng và xe điện", [
    {
        name: "Điều khiển xe cơ giới vượt tốc độ cho phép từ 50% trở lên",
        penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.",
        keywords: ["xe cơ giới", "quá tốc độ", "vượt tốc độ 50%"]
    },
    {
        name: "Lái xe cơ giới trong nhà máy va quệt đồ vật hoặc người",
        description: "Điều khiển xe cơ giới trong nhà máy làm trầy xước đồ vật hoặc con người nhưng không gây thiệt hại kinh tế hoặc thương tích.",
        penaltyText: "Văn kiện không thể hiện mức tiền riêng tại dòng này; cần đối chiếu nội dung xử lý và mức độ sự việc trước khi áp dụng.",
        keywords: ["va quệt", "xe cơ giới", "va chạm"]
    },
    {
        name: "Dùng trọng lượng cơ thể để tăng đối trọng xe nâng",
        penaltyText: "Văn kiện không thể hiện mức tiền riêng tại dòng này; cần đối chiếu nội dung xử lý trước khi áp dụng.",
        keywords: ["xe nâng", "đối trọng", "ngồi lên xe nâng"]
    },
    {
        name: "Điều khiển xe cơ giới vượt tốc độ cho phép dưới 50%",
        penalty: 200000,
        keywords: ["xe cơ giới", "quá tốc độ", "vượt tốc độ dưới 50%"]
    },
    {
        name: "Xe chở hàng chở lẫn người và hàng hoặc lên xuống xe khi xe đang chạy",
        penalty: 200000,
        keywords: ["xe chở hàng", "người và hàng", "lên xuống xe"]
    },
    {
        name: "Đứng trên các bộ phận xe nâng, xe điện hoặc chở thêm người",
        penalty: 200000,
        keywords: ["xe nâng", "xe điện", "chở người"]
    },
    {
        name: "Chở người trong thùng xe tải hoặc vượt số người quy định trong cabin",
        penalty: 200000,
        keywords: ["xe tải", "thùng xe", "quá số người"]
    },
    {
        name: "Không thắt dây an toàn khi điều khiển xe nâng",
        penalty: 200000,
        keywords: ["xe nâng", "dây an toàn", "không thắt dây"]
    },
    {
        name: "Điều khiển xe cơ giới hoặc xe điện thô bạo",
        penalty: 200000,
        keywords: ["xe cơ giới", "xe điện", "lái xe ẩu"]
    },
    {
        name: "Xe nâng chở hàng che khuất tầm nhìn nhưng không lùi xe",
        penalty: 200000,
        keywords: ["xe nâng", "che khuất tầm nhìn", "lùi xe"]
    },
    {
        name: "Điều khiển xe cơ giới không có thiết bị chống tia lửa vào khu vực trọng điểm PCCC",
        penalty: 200000,
        keywords: ["xe cơ giới", "chống tia lửa", "PCCC"]
    },
    {
        name: "Sử dụng điện thoại, máy tính bảng hoặc thẻ liệu khi điều khiển xe",
        description: "Sử dụng điện thoại di động, xem máy tính bảng, thẻ liệu hoặc thiết bị tương tự khi lái xe cơ giới hoặc xe điện, gây cản trở việc điều khiển an toàn.",
        penalty: 200000,
        keywords: ["điện thoại", "máy tính bảng", "thẻ liệu", "xe nâng", "xe điện"]
    },
    {
        name: "Tự ý dùng xe cơ giới vận chuyển bình khí hoặc hóa chất nguy hiểm không có dụng cụ chuyên dụng",
        penalty: 200000,
        keywords: ["bình khí", "hóa chất nguy hiểm", "xe cơ giới"]
    },
    {
        name: "Xe nâng vận chuyển thùng dầu, cuộn lớn hoặc vật dễ trượt mà không có biện pháp cố định",
        penalty: 200000,
        keywords: ["xe nâng", "thùng dầu", "cuộn lớn", "cố định"]
    },
    {
        name: "Không tắt máy, để chìa khóa tùy tiện hoặc không khóa phanh tay khi không sử dụng xe nâng",
        penalty: 100000,
        keywords: ["xe nâng", "chìa khóa", "phanh tay", "tắt máy"]
    },
    {
        name: "Xe có lỗi hoặc nguy cơ mất an toàn nhưng không sửa chữa vẫn tiếp tục sử dụng",
        penalty: 100000,
        keywords: ["xe hỏng", "xe lỗi", "sửa chữa", "nguy cơ"]
    },
    {
        name: "Không giảm tốc độ, dừng xe hoặc nhường người đi bộ tại giao lộ",
        penalty: 100000,
        keywords: ["giao lộ", "người đi bộ", "nhường đường", "giảm tốc"]
    },
    {
        name: "Vận chuyển vật lớn, dài hoặc rộng không cố định, không cảnh báo hoặc không có người giám sát",
        penalty: 100000,
        keywords: ["vận chuyển", "hàng quá khổ", "cố định", "cảnh báo"]
    },
    {
        name: "Không sử dụng còi hoặc thiết bị cảnh báo khi rẽ, lùi, quay đầu, ra vào cửa hoặc tầm nhìn hạn chế",
        penalty: 100000,
        keywords: ["còi", "cảnh báo", "lùi xe", "quay đầu"]
    },
    {
        name: "Không cố định bình khí xe nâng bằng giá đỡ chuyên dụng",
        description: "Bình khí xe nâng không được cố định bằng giá đỡ chuyên dụng hoặc dùng dây thừng, băng keo để cố định.",
        penalty: 100000,
        keywords: ["xe nâng", "bình khí", "giá đỡ"]
    },
    {
        name: "Lên xuống xe khi xe chưa dừng hẳn",
        penalty: 100000,
        keywords: ["lên xe", "xuống xe", "xe chưa dừng"]
    },
    {
        name: "Điều khiển phương tiện với tư thế không đúng quy định",
        penalty: 100000,
        keywords: ["tư thế lái xe", "điều khiển phương tiện"]
    },
    {
        name: "Tiếp tục kéo hoặc sử dụng dụng cụ vận chuyển bị hư hỏng mà không sửa chữa",
        penalty: 100000,
        keywords: ["dụng cụ vận chuyển", "xe kéo", "hư hỏng"]
    },
    {
        name: "Đặt vật liệu vận chuyển chắn thiết bị PCCC trong xưởng",
        penalty: 100000,
        keywords: ["vật liệu", "thiết bị PCCC", "chắn bình chữa cháy"]
    },
    {
        name: "Không hạ càng xe nâng xuống sau khi sử dụng",
        penalty: 100000,
        keywords: ["xe nâng", "càng nâng", "hạ càng"]
    },
    {
        name: "Đỗ xe cơ giới sai vị trí hoặc tại đường dốc, cửa lối đi",
        penalty: 100000,
        keywords: ["đỗ xe", "đường dốc", "lối đi"]
    },
    {
        name: "Không điền phiếu kiểm tra xe kịp thời hoặc không phát hiện nguy cơ của xe",
        penalty: 100000,
        keywords: ["phiếu kiểm tra", "kiểm tra xe", "điểm kiểm"]
    },
    {
        name: "Xe nâng vận chuyển kệ hàng, bàn cao su vượt số lượng quy định",
        penalty: 100000,
        keywords: ["xe nâng", "kệ hàng", "bàn cao su", "số lượng"]
    },
    {
        name: "Xe điện kéo xe phôi lốp, xe vải lót hoặc xe tanh vượt số lượng quy định",
        penalty: 100000,
        keywords: ["xe điện", "xe phôi lốp", "xe vải lót", "xe tanh"]
    },
    {
        name: "Xe nâng, xe điện không đỗ đúng vị trí hoặc không cách vật liệu dễ cháy 5 mét",
        penalty: 100000,
        keywords: ["xe nâng", "xe điện", "5 mét", "vật liệu dễ cháy"]
    },
    {
        name: "Đặt vật liệu vận chuyển chắn thiết bị PCCC trong xưởng",
        penalty: 200000,
        keywords: ["vật liệu", "PCCC", "chắn thiết bị chữa cháy"]
    },
    {
        name: "Điều khiển phương tiện với tư thế không đúng",
        penalty: 100000,
        keywords: ["tư thế lái xe", "điều khiển xe"]
    },
    {
        name: "Dùng xe nâng vận chuyển kệ hàng, bàn cao su vượt số lượng quy định",
        penalty: 100000,
        keywords: ["xe nâng", "kệ hàng", "bàn cao su"]
    },
    {
        name: "Dùng xe điện kéo xe phôi lốp, xe vải lót, xe tanh vượt số lượng cho phép",
        penalty: 200000,
        keywords: ["xe điện", "xe phôi lốp", "xe vải lót", "xe tanh"]
    },
    {
        name: "Điều khiển xe nâng bằng một càng hoặc hai càng nâng các vật khác nhau gây lệch tải",
        penalty: 200000,
        keywords: ["xe nâng", "một càng", "lệch tải", "mất cân bằng"]
    },
    {
        name: "Các hành vi khác không phù hợp quy định quản lý phương tiện",
        penaltyText: "Áp dụng mức phạt theo kết quả đánh giá mức độ rủi ro của hành vi không an toàn.",
        keywords: ["phương tiện", "xe nâng", "xe điện", "đánh giá rủi ro"]
    }
]);

// ------------------------------------------------------
// 7.1.4.5 - VẬN HÀNH THIẾT BỊ
// ------------------------------------------------------

addViolation("7.1.4.5", "equipment", "Vận hành thiết bị", [
    {
        name: "Lấy vật liệu hoặc thao tác bộ phận quay nhưng không chuyển sang chế độ thủ công",
        penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.",
        keywords: ["bộ phận quay", "chế độ thủ công", "lấy vật liệu"]
    },
    {
        name: "Tự ý bật hoặc tắt công tắc, cầu dao, van khi chưa rõ tình trạng nguồn điện hoặc động lực",
        penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.",
        keywords: ["công tắc", "cầu dao", "van", "nguồn điện"]
    },
    {
        name: "Tự ý tháo bỏ hoặc sử dụng sai thiết bị an toàn, chiếu sáng, liên động, tín hiệu, phanh, báo động, chống sét, PCCC",
        penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.",
        keywords: ["tháo thiết bị an toàn", "liên động", "phanh", "báo động"]
    },
    {
        name: "Bước qua hoặc truyền đồ vật qua thiết bị đang vận hành, di chuyển, nhiệt độ cao hoặc có điện",
        penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.",
        keywords: ["bước qua máy", "thiết bị đang chạy", "thiết bị có điện"]
    },
    {
        name: "Tự ý sửa đổi chương trình hoặc thông số hệ thống bảo vệ an toàn thiết bị khi chưa đánh giá",
        penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.",
        keywords: ["chương trình", "thông số", "hệ thống bảo vệ", "sửa đổi"]
    },
    {
        name: "Vì tiện đường mà trèo qua khu vực hoặc vị trí nguy hiểm",
        penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.",
        keywords: ["trèo qua", "khu vực nguy hiểm"]
    },
    {
        name: "Chạm vào bộ phận nguy hiểm khi thiết bị đang hoạt động",
        description: "Chạm vào cửa cấp liệu, bộ phận cuộn, truyền động, lăn, chuyển động, đục lỗ, cắt, cán, ép hoặc đi vào khu vực nguy hiểm khi thiết bị đang chạy.",
        penalty: 200000,
        keywords: ["bộ phận nguy hiểm", "cửa cấp liệu", "truyền động", "máy đang chạy"]
    },
    {
        name: "Gọi hoặc nhận điện thoại khi đang vận hành thiết bị",
        description: "Bao gồm sử dụng các thiết bị điện tử cá nhân có chức năng nghe nhìn trong khi vận hành máy.",
        penalty: 200000,
        keywords: ["điện thoại", "vận hành thiết bị", "nghe nhìn"]
    },
    {
        name: "Sử dụng thiết bị vượt giới hạn tải trọng, tốc độ, áp suất, nhiệt độ, độ ẩm hoặc thời hạn",
        penalty: 200000,
        keywords: ["quá tải", "tốc độ", "áp suất", "nhiệt độ"]
    },
    {
        name: "Không khôi phục thiết bị bảo vệ sau khi bảo trì hoặc xử lý bất thường",
        penalty: 400000,
        keywords: ["thiết bị bảo vệ", "khôi phục", "bảo trì"]
    },
    {
        name: "Có dụng cụ an toàn nhưng không sử dụng khi thao tác",
        penalty: 200000,
        keywords: ["dụng cụ an toàn", "không sử dụng"]
    },
    {
        name: "Dùng thiết bị bảo vệ an toàn để đóng mở thiết bị",
        penalty: 100000,
        keywords: ["thiết bị bảo vệ", "đóng mở máy"]
    },
    {
        name: "Vận hành thiết bị có thiết bị an toàn không đầy đủ hoặc đã hư hỏng",
        penalty: 100000,
        keywords: ["thiết bị an toàn", "hư hỏng", "thiếu thiết bị"]
    },
    {
        name: "Dùng cưa không răng để thực hiện công việc mài",
        penalty: 100000,
        keywords: ["cưa không răng", "mài"]
    },
    {
        name: "Hai người cùng vận hành máy mài",
        penalty: 100000,
        keywords: ["máy mài", "hai người"]
    },
    {
        name: "Mài vật hoặc thao tác ngay phía trước vật đang quay, có nguy cơ bắn văng",
        penalty: 100000,
        keywords: ["máy mài", "vật quay", "bắn văng"]
    },
    {
        name: "Sử dụng dụng cụ điện, khí nén cầm tay hoặc máy mài không có tấm chắn, tay cầm hoặc tấm chắn bị hỏng",
        penalty: 100000,
        keywords: ["máy mài", "tấm chắn", "tay cầm", "dụng cụ điện"]
    },
    {
        name: "Không tắt nguồn điện hoặc nguồn khí sau khi sử dụng dụng cụ điện",
        description: "Không tắt nguồn máy mài góc, máy khoan khí nén, máy hàn điện và các dụng cụ tương tự sau khi sử dụng.",
        penalty: 100000,
        keywords: ["máy mài", "máy khoan", "máy hàn", "tắt nguồn"]
    },
    {
        name: "Không sử dụng dụng cụ an toàn theo yêu cầu của SOP",
        penalty: 100000,
        keywords: ["SOP", "dụng cụ an toàn"]
    },
    {
        name: "Tự ý sử dụng thiết bị hoặc phương tiện không thuộc quyền vận hành của mình",
        penalty: 100000,
        keywords: ["tự ý sử dụng", "thiết bị", "không thuộc quyền vận hành"]
    }
]);

// ------------------------------------------------------
// 7.1.4.6 - AN TOÀN PHÒNG CHÁY CHỮA CHÁY
// ------------------------------------------------------

addViolation("7.1.4.6", "fire", "An toàn phòng cháy chữa cháy", [
    {
        name: "Đặt bình axetylen cách bình oxy dưới 5 mét hoặc bình khí cách nguồn lửa dưới 10 mét",
        penalty: 200000,
        keywords: ["axetylen", "oxy", "bình khí", "10 mét", "5 mét"]
    },
    {
        name: "Tự ý chặn lối thoát hiểm hoặc chiếm dụng đường giao thông PCCC",
        penalty: 100000,
        keywords: ["lối thoát hiểm", "đường PCCC", "chặn lối"]
    },
    {
        name: "Dùng vật chứa không chuyên dụng, dễ phát sinh tĩnh điện để đựng hóa chất nguy hiểm",
        penalty: 100000,
        keywords: ["tĩnh điện", "vật chứa", "hóa chất nguy hiểm"]
    },
    {
        name: "Không lưu trữ và sử dụng hóa chất nguy hiểm đúng vị trí, đóng kín và giới hạn số lượng",
        penalty: 100000,
        keywords: ["hóa chất", "lưu trữ", "đóng kín", "số lượng"]
    },
    {
        name: "Đặt bình axetylen nằm ngang khi sử dụng hoặc để lẫn các loại bình khí",
        penalty: 100000,
        keywords: ["bình axetylen", "bình khí", "đặt nằm ngang"]
    },
    {
        name: "Các hành vi khác có nguy cơ gây cháy hoặc phát sinh nguy cơ PCCC",
        penaltyText: "Tham khảo Quy định quản lý an toàn PCCC để xử phạt.",
        keywords: ["PCCC", "cháy", "nguy cơ cháy", "quy định PCCC"]
    }
]);
// ------------------------------------------------------
// 7.1.4.7 - CÔNG VIỆC NGUY CƠ CAO
// ------------------------------------------------------

addViolation("7.1.4.7", "highrisk", "Công việc nguy cơ cao", [
    { name: "Bình axetylen hoặc mỏ hàn không lắp van chống cháy ngược", penalty: 200000, keywords: ["axetylen", "van chống cháy ngược", "hàn cắt"] },
    { name: "Khoảng cách giữa bình oxy và axetylen dưới 5 mét hoặc đến điểm hàn cắt dưới 8 mét", penalty: 200000, keywords: ["oxy", "axetylen", "khoảng cách", "hàn cắt"] },
    { name: "Bình oxy hoặc axetylen đặt nằm, dựng đứng không có thiết bị chống đổ hoặc đồng hồ áp suất hỏng", penalty: 100000, keywords: ["bình oxy", "bình axetylen", "đồng hồ áp suất"] },
    { name: "Đầu nối dây hàn bị hỏng hoặc dây hàn có từ hai vết hư hỏng trở lên vẫn tiếp tục sử dụng", penalty: 100000, keywords: ["dây hàn", "đầu nối", "hư hỏng"] },
    { name: "Máy hàn yêu cầu tiếp địa nhưng vỏ máy không được nối đất an toàn", penalty: 100000, keywords: ["máy hàn", "tiếp địa", "nối đất"] },
    { name: "Sử dụng kết cấu kim loại, đường ống, đường ray hoặc thiết bị làm dây dẫn hàn", penalty: 100000, keywords: ["dây dẫn hàn", "kết cấu kim loại", "đường ray"] },
    { name: "Không tháo que hàn khỏi kìm hàn khi không sử dụng máy hàn", penalty: 100000, keywords: ["que hàn", "kìm hàn"] },
    { name: "Tín hiệu chỉ huy không rõ ràng hoặc chỉ huy sai quy định nhưng vẫn tiến hành nâng cẩu", penalty: 200000, keywords: ["nâng cẩu", "tín hiệu chỉ huy", "chỉ huy"] },
    { name: "Tiến hành nâng cẩu khi hàng hóa quá tải hoặc không rõ trọng lượng", penalty: 200000, keywords: ["nâng cẩu", "quá tải", "trọng lượng"] },
    { name: "Vật nâng hoặc phôi buộc không chắc chắn nhưng vẫn tiến hành nâng cẩu", penalty: 200000, keywords: ["vật nâng", "buộc hàng", "nâng cẩu"] },
    { name: "Trên vật nâng có người hoặc vật thể đặt không chắc chắn nhưng vẫn nâng cẩu", penalty: 200000, keywords: ["vật nâng", "người trên vật nâng", "nâng cẩu"] },
    { name: "Thiết bị nâng thiếu, hỏng hoặc thiết bị an toàn hoạt động không nhạy nhưng vẫn sử dụng", penalty: 200000, keywords: ["thiết bị nâng", "thiết bị an toàn", "cẩu"] },
    { name: "Nâng vật bị chôn dưới đất hoặc đang liên kết với công trình, thiết bị khác", penalty: 200000, keywords: ["vật bị chôn", "nâng cẩu", "liên kết"] },
    { name: "Tiến hành nâng cẩu khi ánh sáng yếu hoặc tầm nhìn không rõ", penalty: 200000, keywords: ["ánh sáng", "tầm nhìn", "nâng cẩu"] },
    { name: "Vật nâng có góc sắc nhọn nhưng không có biện pháp bảo vệ, cách ly chống cắt", penalty: 200000, keywords: ["vật sắc nhọn", "dây cáp", "nâng cẩu"] },
    { name: "Nâng vật theo kiểu kéo lệch hoặc móc treo nghiêng", penalty: 200000, keywords: ["kéo lệch", "móc nghiêng", "nâng cẩu"] },
    { name: "Gia công trực tiếp trên vật đang được treo nâng", penalty: 200000, keywords: ["gia công", "vật đang treo", "nâng cẩu"] },
    { name: "Sử dụng dây cáp, dây treo đã mòn đến mức phải loại bỏ hoặc không đủ tải trọng", penalty: 200000, keywords: ["dây cáp", "dây treo", "quá tải"] },
    { name: "Sử dụng thiết bị nâng để chở người", penalty: 400000, keywords: ["cẩu", "palang", "chở người"] },
    { name: "Không thiết lập dây cảnh giới hoặc có người đứng trong bán kính nâng cẩu", penalty: 100000, keywords: ["dây cảnh giới", "bán kính nâng cẩu"] },
    { name: "Dùng cơ thể tiếp xúc vật đang treo khi vật cách mặt phẳng nâng trên 0,5 mét", penalty: 100000, keywords: ["vật đang treo", "0,5 mét", "nâng cẩu"] },
    { name: "Không đỗ thiết bị nâng đúng vị trí hoặc không ngắt điện tay điều khiển sau khi sử dụng", penalty: 100000, keywords: ["thiết bị nâng", "tay điều khiển", "ngắt điện"] },
    { name: "Để dây treo, dây cáp bừa bãi hoặc không xử lý dây treo đã đạt tiêu chuẩn loại bỏ", penalty: 100000, keywords: ["dây treo", "dây cáp", "loại bỏ"] },
    { name: "Đứng hoặc đi qua bên dưới vật đang được nâng hoặc vật đang lơ lửng", penalty: 100000, keywords: ["vật treo", "bên dưới", "nâng cẩu"] },
    { name: "Không kiểm tra oxy, khí cháy hoặc khí độc trước khi làm việc trong không gian hạn chế", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["không gian hạn chế", "khí oxy", "khí độc", "khí cháy"] },
    { name: "Không mang trang bị bảo hộ lao động theo yêu cầu khi làm việc trong không gian hạn chế", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["không gian hạn chế", "BHLĐ"] },
    { name: "Không kiểm tra khí liên tục trong suốt thời gian làm việc trong không gian hạn chế", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["không gian hạn chế", "kiểm tra khí", "khí liên tục"] },
    { name: "Làm việc trên cao tại vị trí không có điểm tựa cố định hoặc mép ngoài bề mặt đỡ nhưng sử dụng sai dây an toàn, giỏ nâng hoặc lan can", penalty: 200000, keywords: ["làm việc trên cao", "dây an toàn", "giỏ nâng", "lan can"] },
    { name: "Tùy tiện ném đồ vật từ nơi làm việc trên cao xuống dưới hoặc sang hướng khác", penalty: 100000, keywords: ["trên cao", "ném đồ vật"] },
    { name: "Thực hiện công việc giao thoa bên dưới khu vực đang làm việc trên cao", penalty: 100000, keywords: ["trên cao", "công việc giao thoa"] },
    { name: "Sử dụng thang máy trong thời gian bảo trì hoặc khi đã treo biển cảnh báo", penaltyText: "Chấm dứt hợp đồng lao động.", keywords: ["thang máy", "bảo trì", "biển cảnh báo"] },
    { name: "Lạm dụng thang máy hoặc gây thiệt hại tài sản do sự cố thang máy", penaltyText: "Văn kiện không nêu rõ mức tiền riêng tại dòng này; xử lý theo nội dung và trách nhiệm của sự việc.", keywords: ["thang máy", "thiệt hại tài sản"] },
    { name: "Vận hành thang máy khi chưa được đào tạo hoặc chưa qua kiểm tra", penalty: 200000, keywords: ["thang máy", "đào tạo", "kiểm tra"] },
    { name: "Sử dụng thang máy quá tải hoặc dùng thang máy chở người để vận chuyển hàng", penalty: 200000, keywords: ["thang máy", "quá tải", "chở hàng"] },
    { name: "Đưa tay, chân hoặc vật cứng vào cửa thang máy khi cửa đang đóng mở", penalty: 500000, keywords: ["thang máy", "cửa thang", "tay chân"] },
    { name: "Tiếp tục sử dụng thang máy khi có dấu hiệu rung lắc hoặc tiếng động bất thường", penalty: 500000, keywords: ["thang máy", "rung lắc", "tiếng động"] },
    { name: "Tự ý dùng tay hoặc dụng cụ mở cửa tầng hoặc cửa cabin thang máy", penalty: 500000, keywords: ["thang máy", "mở cửa", "cabin"] },
    { name: "Phát hiện sự cố kỹ thuật hoặc hành vi bất thường của thang máy nhưng không báo cáo", penalty: 500000, keywords: ["thang máy", "sự cố kỹ thuật", "không báo cáo"] },
    { name: "Không tuân thủ biển chỉ dẫn, cảnh báo hoặc quy trình vận hành thang máy", penalty: 500000, keywords: ["thang máy", "biển chỉ dẫn", "quy trình"] },
    { name: "Tự ý lắp đặt, cải tạo hoặc sửa đổi hệ thống thang máy khi chưa được phép", penalty: 500000, keywords: ["thang máy", "cải tạo", "lắp đặt"] },
    { name: "Tiến hành công việc nguy cơ cao khi không đáp ứng điều kiện làm việc", penaltyText: "Chấm dứt hợp đồng lao động.", keywords: ["nguy cơ cao", "điều kiện làm việc"] },
    { name: "Không có người giám sát tại hiện trường khi thực hiện công việc nguy cơ cao", penalty: 200000, keywords: ["nguy cơ cao", "người giám sát"] },
    { name: "Không chuẩn bị biện pháp an toàn hoặc phương án ứng phó khẩn cấp cho công việc nguy cơ cao", penalty: 200000, keywords: ["nguy cơ cao", "biện pháp an toàn", "ứng phó khẩn cấp"] },
    { name: "Không lập phương án công việc nguy cơ cao và không nhận diện rủi ro tại hiện trường", penalty: 200000, keywords: ["nguy cơ cao", "phương án", "nhận diện rủi ro"] },
    { name: "Các hành vi khác vi phạm quy định quản lý công việc nguy cơ cao", penaltyText: "Áp dụng mức phạt theo kết quả đánh giá mức độ rủi ro của hành vi không an toàn.", keywords: ["nguy cơ cao", "hàn cắt", "trên cao", "điện tạm", "không gian hạn chế", "đào đất", "nâng cẩu"] }
]);

// ------------------------------------------------------
// 7.1.4.8 - CÔNG VIỆC ĐIỆN
// ------------------------------------------------------

addViolation("7.1.4.8", "electrical", "Công việc điện", [
    { name: "Sửa chữa đường dây cao áp khi chưa cắt điện, chưa kiểm tra điện áp hoặc không mang đúng BHLĐ", penaltyText: "Chấm dứt hợp đồng lao động.", keywords: ["cao áp", "cắt điện", "kiểm tra điện", "BHLĐ"] },
    { name: "Người không phải thợ điện tự ý đấu nối điện hoặc thợ điện làm việc khi thiết bị đang mang điện", penaltyText: "Chấm dứt hợp đồng lao động.", keywords: ["đấu nối điện", "thợ điện", "điện đang mang điện"] },
    { name: "Đèn cầm tay hoặc đèn chiếu sáng cục bộ không sử dụng điện áp an toàn; môi trường ẩm hoặc thùng kim loại không dùng điện áp cực thấp", penalty: 200000, keywords: ["đèn cầm tay", "điện áp an toàn", "môi trường ẩm"] },
    { name: "Thiết bị chống rò điện hỏng hoặc ổ cắm trong tủ điện không có thiết bị chống rò", penalty: 200000, keywords: ["chống rò điện", "ELCB", "RCD", "tủ điện"] },
    { name: "Không cách điện các đầu dây điện trần sau khi thi công", penalty: 200000, keywords: ["đầu dây trần", "cách điện"] },
    { name: "Thiết bị đóng cắt trong tủ điện không được cố định hoặc bị rơi ra", penalty: 100000, keywords: ["tủ điện", "thiết bị đóng cắt"] },
    { name: "Không vệ sinh bụi bẩn trong tủ hoặc hộp điện kịp thời", penalty: 100000, keywords: ["tủ điện", "bụi bẩn", "vệ sinh"] },
    { name: "Sử dụng dụng cụ điện không có cách điện kép tại khu vực ẩm ướt, thùng chứa hoặc kết cấu kim loại", penalty: 100000, keywords: ["cách điện kép", "dụng cụ điện", "khu vực ẩm"] },
    { name: "Đường điện tạm thời chưa được phê duyệt hoặc không treo biển nhận dạng", penalty: 100000, keywords: ["điện tạm", "phê duyệt", "biển báo"] },
    { name: "Dùng dụng cụ điện cầm tay không có bảo vệ chống rò độc lập hoặc dây nguồn hỏng, có mối nối, dài quá quy định", penalty: 100000, keywords: ["dụng cụ điện cầm tay", "chống rò", "dây nguồn"] },
    { name: "Cửa tủ điện hoặc hộp điều khiển không được khóa", penalty: 100000, keywords: ["tủ điện", "khóa cửa"] },
    { name: "Thiết bị điện phân phối không lắp trong tủ điện hoặc lắp không chắc chắn", penalty: 100000, keywords: ["thiết bị phân phối điện", "tủ điện"] },
    { name: "Cửa tủ điện không có dây nối liên kết với thân tủ", penalty: 100000, keywords: ["cửa tủ điện", "nối đất", "dây liên kết"] },
    { name: "Các hành vi khác không phù hợp yêu cầu quản lý an toàn điện", penaltyText: "Áp dụng mức phạt theo kết quả đánh giá mức độ rủi ro của hành vi không an toàn.", keywords: ["an toàn điện", "đánh giá rủi ro"] }
]);
// ------------------------------------------------------
// 7.1.4.9 - QUẢN LÝ AN TOÀN
// ------------------------------------------------------

addViolation("7.1.4.9", "safety_management", "Quản lý an toàn", [
    { name: "Ép buộc người khác làm việc trái quy định hoặc biết nguy cơ nghiêm trọng nhưng vẫn tổ chức làm việc", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["ép buộc", "nguy cơ nghiêm trọng", "tổ chức làm việc"] },
    { name: "Không khắc phục kịp thời hoặc khắc phục không triệt để vị trí thiết bị từng xảy ra sự cố an toàn", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["khắc phục", "thiết bị", "sự cố an toàn"] },
    { name: "Nhà thầu bên ngoài làm công việc nguy cơ cao nhưng không có nhân viên quản lý khu vực giám sát", penalty: 200000, keywords: ["nhà thầu", "nguy cơ cao", "giám sát"] },
    { name: "Không xây dựng kế hoạch nhận diện rủi ro hằng năm hoặc không triển khai nhận diện rủi ro", penalty: 200000, keywords: ["nhận diện rủi ro", "kế hoạch năm"] },
    { name: "Danh mục kiểm soát phân cấp rủi ro không phù hợp tình hình thực tế tại hiện trường", penalty: 200000, keywords: ["danh mục rủi ro", "kiểm soát rủi ro"] },
    { name: "Không cập nhật, hoàn thiện danh mục kiểm soát phân cấp rủi ro theo kế hoạch hằng năm", penalty: 200000, keywords: ["cập nhật rủi ro", "danh mục kiểm soát"] },
    { name: "Không tổ chức kiểm tra thường nhật, chuyên đề hoặc tổng hợp theo kế hoạch rà soát nguy cơ", penalty: 200000, keywords: ["kiểm tra", "nguy cơ tiềm ẩn", "kế hoạch"] },
    { name: "Cá nhân không kiểm tra theo kế hoạch rà soát nguy cơ và không báo cáo cấp trên kịp thời", penalty: 200000, keywords: ["cá nhân", "kiểm tra", "báo cáo cấp trên"] },
    { name: "Không khắc phục an toàn thiết bị kịp thời hoặc không thực hiện đúng yêu cầu", penalty: 200000, keywords: ["khắc phục", "thiết bị", "an toàn"] },
    { name: "Không cải thiện an toàn thiết bị theo tiêu chuẩn Trung tâm sản xuất ban hành", penalty: 200000, keywords: ["cải thiện thiết bị", "Trung tâm sản xuất"] },
    { name: "Không thúc đẩy tiến độ cải thiện an toàn theo lộ trình của Trung tâm sản xuất", penalty: 200000, keywords: ["tiến độ", "cải thiện an toàn"] },
    { name: "Không nghiêm túc triển khai chế độ trách nhiệm an toàn sản xuất", penalty: 200000, keywords: ["trách nhiệm an toàn", "quản lý"] },
    { name: "Quản lý không lập cam kết an toàn hằng năm hoặc quản lý mới không ký cam kết trách nhiệm", penalty: 200000, keywords: ["cam kết an toàn", "cam kết trách nhiệm"] },
    { name: "Bố trí nhân viên mới làm việc khi chưa hoàn thành huấn luyện an toàn ba cấp và kiểm tra đạt yêu cầu", penalty: 200000, keywords: ["nhân viên mới", "huấn luyện ba cấp", "đào tạo"] },
    { name: "Không tổ chức đào tạo an toàn cho nhân viên trở lại làm việc, chuyển vị trí hoặc làm việc với yếu tố mới", penalty: 200000, keywords: ["chuyển vị trí", "bốn mới", "đào tạo"] },
    { name: "Cán bộ quản lý không lập kế hoạch hành động cá nhân theo yêu cầu", penalty: 200000, keywords: ["kế hoạch hành động", "quản lý"] },
    { name: "Quản lý không đánh giá việc thực hiện công tác an toàn của cấp dưới", penalty: 200000, keywords: ["đánh giá cấp dưới", "trách nhiệm quản lý"] },
    { name: "Không tổ chức họp an toàn định kỳ và không xin phép, báo cáo cấp trên", penalty: 200000, keywords: ["họp an toàn", "họp định kỳ"] },
    { name: "Vắng mặt không lý do tại cuộc họp an toàn định kỳ", penalty: 100000, keywords: ["vắng họp", "họp an toàn"] },
    { name: "Không nộp tài liệu họp an toàn đúng hạn và không giải trình lý do", penalty: 100000, keywords: ["tài liệu họp", "nộp trễ"] },
    { name: "Không nộp biên bản họp an toàn đúng hạn hoặc biên bản nhiều lần không đạt", penalty: 100000, keywords: ["biên bản họp", "họp an toàn"] },
    { name: "Nhà máy không lập hồ sơ quản lý rủi ro và hồ sơ thực hiện chức trách theo yêu cầu", penalty: 100000, keywords: ["hồ sơ rủi ro", "hồ sơ chức trách"] },
    { name: "Không cập nhật hồ sơ quản lý rủi ro và hồ sơ thực hiện chức trách theo tuần", penalty: 100000, keywords: ["cập nhật hồ sơ", "hồ sơ rủi ro"] },
    { name: "Hồ sơ quản lý rủi ro không phù hợp thực tế hoặc có hành vi làm giả", penalty: 100000, keywords: ["làm giả hồ sơ", "hồ sơ rủi ro"] },
    { name: "Không báo cáo thông tin tai nạn kịp thời lên cấp có thẩm quyền", penalty: 200000, keywords: ["báo cáo tai nạn", "không báo cáo"] },
    { name: "Bộ phận xảy ra tai nạn không nộp báo cáo nhanh tai nạn kịp thời", penalty: 200000, keywords: ["báo cáo nhanh tai nạn", "tai nạn"] },
    { name: "Bộ phận xảy ra tai nạn không tổ chức họp phản ứng nhanh kịp thời", penalty: 200000, keywords: ["họp phản ứng nhanh", "tai nạn"] },
    { name: "Không tuyên truyền phổ biến tai nạn từ trên xuống hoặc thời gian tuyên truyền không đủ", penalty: 100000, keywords: ["tuyên truyền tai nạn", "phổ biến tai nạn"] },
    { name: "Không cải thiện vị trí xảy ra tai nạn hoặc vị trí có rủi ro tương tự; khắc phục không triệt để", penalty: 400000, keywords: ["cải thiện sau tai nạn", "rủi ro tương tự"] },
    { name: "Làm mất hoặc làm hỏng thẻ dừng máy, khóa LOTO và phụ kiện do nguyên nhân chủ quan", penalty: 100000, keywords: ["LOTO", "thẻ dừng máy", "khóa"] },
    { name: "Sử dụng sai loại khóa hoặc khóa không phù hợp với đế khóa trong quá trình LOTO", penalty: 100000, keywords: ["LOTO", "sai loại khóa", "đế khóa"] },
    { name: "Chỉ sử dụng thẻ hoặc khóa riêng lẻ, không kết hợp cả hai theo quy định", penalty: 200000, keywords: ["LOTO", "khóa", "thẻ"] },
    { name: "Bộ phận không xây dựng kế hoạch diễn tập ứng phó khẩn cấp hằng năm hoặc không triển khai theo tiến độ", penalty: 100000, keywords: ["diễn tập khẩn cấp", "kế hoạch năm"] },
    { name: "Không tổ chức diễn tập ứng phó khẩn cấp định kỳ hoặc diễn tập, hồ sơ mang tính hình thức", penalty: 100000, keywords: ["diễn tập", "ứng phó khẩn cấp"] },
    { name: "Bộ phận không xây dựng đầy đủ quy định, quy chế và hướng dẫn thực hiện an toàn sản xuất", penalty: 200000, keywords: ["quy định an toàn", "quy chế", "hướng dẫn"] },
    { name: "Nhà máy hoặc bộ phận không lập hồ sơ, tài liệu liên quan theo yêu cầu", penalty: 200000, keywords: ["hồ sơ", "tài liệu"] },
    { name: "Không cập nhật tài liệu, hồ sơ trong chu kỳ đánh giá", penalty: 100000, keywords: ["cập nhật tài liệu", "hồ sơ"] },
    { name: "Các hành vi khác không thực hiện theo quy định, tiêu chuẩn, quy trình và cơ chế quản lý an toàn", penaltyText: "Áp dụng mức phạt theo kết quả đánh giá mức độ rủi ro của hành vi không an toàn.", keywords: ["quy định an toàn", "tiêu chuẩn", "quy trình", "đánh giá rủi ro"] },
    { name: "Không kiểm soát các hành vi vi phạm nghiêm trọng hoặc tái phạm nhiều lần trong phạm vi nhà máy, bộ phận", penaltyText: "Truy cứu trách nhiệm các cấp quản lý theo mức độ vi phạm; mức phạt theo kết quả đánh giá rủi ro.", keywords: ["tái phạm", "liên đới quản lý", "trách nhiệm quản lý"] }
]);
// ------------------------------------------------------
// 7.1.4.10 - QUY TRÌNH LUYỆN CAO SU
// ------------------------------------------------------

addViolation("7.1.4.10", "mixing", "Quy trình luyện cao su", [
    { name: "Không cắm chốt an toàn khi bảo trì hoặc vệ sinh chốt đỉnh, cửa xả máy luyện kín", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["máy luyện kín", "chốt an toàn", "cửa xả"] },
    { name: "Đi qua cân băng tải khi chưa dừng máy và treo biển cảnh báo", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["cân băng tải", "dừng máy", "treo biển"] },
    { name: "Đưa tay gần vị trí dao cắt máy dẫn hướng khi máy đang chạy", penalty: 200000, keywords: ["máy dẫn hướng", "dao cắt"] },
    { name: "Đưa tay gần con lăn băng tải cấp su khi máy đang hoạt động", penalty: 200000, keywords: ["băng tải cấp su", "con lăn"] },
    { name: "Vận hành máy cắt su bằng một tay hoặc dùng dụng cụ khác thay nút điều khiển", penalty: 200000, keywords: ["máy cắt su", "một tay", "nút điều khiển"] },
    { name: "Sạc xe nâng xếp tại hộp điện ở bệ máy", penalty: 100000, keywords: ["xe nâng xếp", "sạc", "hộp điện"] },
    { name: "Dùng dao cắt su hướng lưỡi dao vào bản thân hoặc người khác", penalty: 100000, keywords: ["dao cắt su", "lưỡi dao"] },
    { name: "Không đặt dao cắt su vào hộp sau khi sử dụng", penalty: 100000, keywords: ["dao cắt su", "hộp đựng dao"] },
    { name: "Đặt chai dầu trên tủ điều khiển hoặc tủ điện", penalty: 100000, keywords: ["chai dầu", "tủ điện"] },
    { name: "Không dọn kịp thời muội than, dầu và vật liệu dễ cháy tại cửa xả", penalty: 100000, keywords: ["muội than", "dầu", "cửa xả"] },
    { name: "Đặt chất dễ cháy trong tủ máy tính hoặc tủ điện", penalty: 100000, keywords: ["chất dễ cháy", "tủ điện"] },
    { name: "Không vệ sinh bụi theo yêu cầu", penalty: 100000, keywords: ["vệ sinh bụi", "bụi bẩn"] },
    { name: "Xếp chồng bàn cao su quá 5 cái, dùng bàn hỏng hoặc đặt bàn đứng, lật ngược", penalty: 100000, keywords: ["bàn cao su", "xếp chồng", "pallet"] },
    { name: "Không đặt xe kệ thuốc, giỏ nhựa hoặc bàn cao su đúng vị trí", penalty: 100000, keywords: ["xe kệ thuốc", "giỏ nhựa", "bàn cao su"] },
    { name: "Vệ sinh giữa bể làm lạnh và trục máy đùn khi chưa xin phép xử lý bất thường, chưa liên hệ trực ca trưởng giám sát", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["bể làm lạnh", "máy đùn", "xử lý bất thường"] },
    { name: "Mở cửa quan sát máy đùn khi máy đang hoạt động bình thường", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["máy đùn", "cửa quan sát"] },
    { name: "Thay dấu thép mà không dừng băng tải tiếp nhận", penalty: 200000, keywords: ["dấu thép", "băng tải"] },
    { name: "Không đeo găng tay cách nhiệt khi kéo dẫn liệu máy đùn", penalty: 100000, keywords: ["găng tay cách nhiệt", "máy đùn"] },
    { name: "Đứng gần khu vực nâng hạ khi bệ xoay bánh xe của giàn làm lạnh hoạt động", penalty: 100000, keywords: ["giàn làm lạnh", "nâng hạ", "bệ xoay"] },
    { name: "Xử lý băng tải dính su hoặc máy luyện hở quấn trục khi chưa xin phép, chưa có người giám sát", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["máy luyện hở", "quấn trục", "băng tải dính su"] },
    { name: "Đi vào bên trong lưới bảo vệ máy luyện hở để vệ sinh khi chưa xin phép, khóa máy và bố trí giám sát", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["máy luyện hở", "lưới bảo vệ", "khóa máy"] },
    { name: "Không dừng băng tải khi thay dấu thép lúc máy luyện hở đổi liệu", penalty: 200000, keywords: ["máy luyện hở", "dấu thép", "băng tải"] },
    { name: "Không đeo găng tay khi kéo vật liệu", penalty: 100000, keywords: ["kéo vật liệu", "găng tay"] },
    { name: "Dùng tay nhặt su dưới máy luyện hở thay vì dùng móc an toàn", penalty: 100000, keywords: ["móc an toàn", "nhặt su", "máy luyện hở"] },
    { name: "Không nâng bánh in thép hoặc đưa tay gần bánh in khi kéo vật liệu", penalty: 100000, keywords: ["bánh in thép", "kéo vật liệu"] },
    { name: "Sử dụng bàn cao su thô bạo, không nhẹ tay khi đặt và di chuyển", penalty: 100000, keywords: ["bàn cao su", "thao tác thô bạo"] },
    { name: "Đứng trên bàn lăn trong khi thao tác", penalty: 100000, keywords: ["bàn lăn", "đứng trên máy"] },
    { name: "Dùng xe nâng xếp bàn cao su nhưng không quan sát xung quanh hoặc quá gần người khác", penalty: 100000, keywords: ["xe nâng xếp", "bàn cao su", "quan sát"] },
    { name: "Vào bên dưới khu vực nâng hạ của cân để vệ sinh hoặc sửa chữa mà không dùng giá đỡ", penalty: 100000, keywords: ["cân", "giá đỡ", "nâng hạ"] },
    { name: "Xử lý su ép tại giá làm mát mà không có người giám sát", penalty: 100000, keywords: ["giá làm mát", "su ép", "giám sát"] },
    { name: "Bàn cao su hư hỏng, biến dạng nhưng vẫn sử dụng mà không báo sửa chữa", penalty: 100000, keywords: ["bàn cao su", "hư hỏng", "biến dạng"] },
    { name: "Bàn cao su đổ hoặc xếp lệch nhưng dùng tay xử lý mà không dùng dụng cụ an toàn", penalty: 100000, keywords: ["bàn cao su", "đổ", "dụng cụ an toàn"] },
    { name: "Dùng tay xử lý khi bàn cao su vận chuyển bị kẹt mà không dùng dụng cụ an toàn", penalty: 100000, keywords: ["bàn cao su", "kẹt", "dụng cụ an toàn"] },
    { name: "Không dùng móc an toàn lấy su khi thực hiện thao tác nối đầu liệu", penalty: 100000, keywords: ["móc an toàn", "nối đầu liệu"] },
    { name: "Nhân viên phối liệu không đeo găng tay, khẩu trang, tạp dề hoặc ống tay theo yêu cầu", penalty: 100000, keywords: ["phối liệu", "găng tay", "khẩu trang", "tạp dề"] },
    { name: "Đặt lưu huỳnh hoặc vật liệu dễ cháy gần nguồn nhiệt", penalty: 100000, keywords: ["lưu huỳnh", "nguồn nhiệt", "phối liệu"] },
    { name: "Mang nguồn lửa vào phòng phối liệu hoặc sử dụng điện thoại tại hiện trường", penalty: 200000, keywords: ["nguồn lửa", "điện thoại", "phối liệu"] },
    { name: "Không mặc quần áo chống tĩnh điện, giày chống tĩnh điện hoặc không đeo vòng tay chống tĩnh điện", penalty: 200000, keywords: ["chống tĩnh điện", "quần áo", "giày", "vòng tay"] },
    { name: "Không chạm thiết bị xả tĩnh điện trước khi cấp liệu", penalty: 200000, keywords: ["xả tĩnh điện", "cấp liệu"] },
    { name: "Người không thuộc vị trí tự ý vào khu vực phối liệu lưu huỳnh khi chưa được ca tổ cho phép", penalty: 100000, keywords: ["phối liệu lưu huỳnh", "tự ý vào"] },
    { name: "Để vật dễ cháy nổ hoặc vật liệu dễ cháy tại hiện trường phối liệu", penalty: 100000, keywords: ["dễ cháy nổ", "phối liệu"] },
    { name: "Sạc điện thoại, thiết bị điện tử hoặc đỗ xe nâng tại hiện trường phối liệu", penalty: 100000, keywords: ["sạc điện thoại", "xe nâng", "phối liệu"] },
    { name: "Túi phế liệu lưu huỳnh không cách điểm cấp liệu trên 2 mét hoặc không được dọn kịp thời", penalty: 100000, keywords: ["phế liệu lưu huỳnh", "2 mét"] },
    { name: "Nhân viên cấp liệu lưu huỳnh không mang đầy đủ mặt nạ, quần áo chống tĩnh điện, giày, găng tay và vòng tay", penalty: 100000, keywords: ["lưu huỳnh", "mặt nạ", "BHLĐ"] },
    { name: "Ném hoặc lắc mạnh túi lưu huỳnh trong quá trình cấp liệu", penalty: 100000, keywords: ["túi lưu huỳnh", "cấp liệu"] },
    { name: "Mở bao lưu huỳnh không dùng dao gốm chống tĩnh điện hoặc dùng dao đồng, nhôm không nối đất", penalty: 100000, keywords: ["dao gốm", "dao đồng", "dao nhôm", "lưu huỳnh"] },
    { name: "Dùng dụng cụ bằng sắt có thể phát sinh tia lửa đập vào thành thùng", penalty: 100000, keywords: ["tia lửa", "dụng cụ sắt", "thùng"] },
    { name: "Không kẹp dây xả tĩnh điện vào bộ phận kim loại của xe hóa chất trước khi sử dụng", penalty: 100000, keywords: ["xe hóa chất", "xả tĩnh điện"] },
    { name: "Không vệ sinh bụi trên thiết bị phối liệu theo tiêu chuẩn", penalty: 100000, keywords: ["bụi", "thiết bị phối liệu"] },
    { name: "Xe nâng vận chuyển quá 5 bàn cao su trong một lần", penalty: 100000, keywords: ["xe nâng", "bàn cao su", "quá 5"] },
    { name: "Xử lý kẹt liệu, ép su tại các thiết bị luyện su khi chưa xin phép và chưa có người giám sát", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["kẹt liệu", "ép su", "xử lý bất thường", "giám sát"] },
    { name: "Không tuần tra, kiểm tra và ký xác nhận tại khu vực trọng điểm PCCC", penalty: 100000, keywords: ["PCCC", "tuần tra", "ký xác nhận"] },
    { name: "Nhân viên không đeo nút tai và khẩu trang theo yêu cầu", penalty: 100000, keywords: ["nút tai", "khẩu trang"] },
    { name: "Không vệ sinh phương tiện chữa cháy thuộc khu vực quản lý kịp thời", penalty: 100000, keywords: ["phương tiện chữa cháy", "PCCC", "vệ sinh"] }
]);

// ------------------------------------------------------
// 7.1.4.11 - QUY TRÌNH ÉP ĐÙN
// ------------------------------------------------------

addViolation("7.1.4.11", "extrusion", "Quy trình ép đùn", [
    { name: "Đi qua bên dưới cánh tay đòn", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["cánh tay đòn", "đi qua bên dưới"] },
    { name: "Không đeo găng tay chịu nhiệt khi thay khuôn miệng hoặc đường dẫn liệu", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["găng tay chịu nhiệt", "khuôn miệng"] },
    { name: "Dùng tay đỡ tấm khuôn miệng khi đóng đầu máy", penalty: 200000, keywords: ["khuôn miệng", "đóng đầu máy"] },
    { name: "Không đóng kịp thời cửa quan sát nút cấp liệu máy đùn", penalty: 200000, keywords: ["máy đùn", "cửa quan sát"] },
    { name: "Dùng tay chạm thiết bị khi con lăn tiếp nhận nâng hạ", penalty: 200000, keywords: ["con lăn", "nâng hạ"] },
    { name: "Vận chuyển bàn cao su không nhẹ tay", penalty: 100000, keywords: ["bàn cao su", "vận chuyển"] },
    { name: "Không đậy nắp thùng dung dịch đánh dấu hoặc lưu trữ quá một bình mực", penalty: 100000, keywords: ["dung dịch đánh dấu", "mực"] },
    { name: "Không vệ sinh kịp thời khi dung dịch đánh dấu bị rò rỉ", penalty: 100000, keywords: ["rò rỉ", "dung dịch đánh dấu"] },
    { name: "Một người đẩy nhiều cuộn thép cùng lúc", penalty: 100000, keywords: ["cuộn thép", "đẩy nhiều cuộn"] },
    { name: "Một người xếp cuộn vải rỗng cao vượt chiều cao xe dụng cụ", penalty: 100000, keywords: ["cuộn vải", "xe dụng cụ"] },
    { name: "Đi qua bên dưới cuộn dây thép", penalty: 100000, keywords: ["cuộn dây thép", "bên dưới"] },
    { name: "Không dừng hoặc giảm tốc máy khi sắp xếp dây thép trước bảng luồn dây", penalty: 100000, keywords: ["dây thép", "dừng máy", "giảm tốc"] },
    { name: "Xe nâng xếp chồng cuộn lớn khi vận chuyển mà không sử dụng pallet", penalty: 100000, keywords: ["xe nâng", "cuộn lớn", "pallet"] },
    { name: "Xe nâng vận chuyển quá 2 cuộn dây thép", penalty: 100000, keywords: ["xe nâng", "cuộn dây thép", "quá 2"] },
    { name: "Xe nâng đặt cuộn lớn có nguy cơ lật, không đặt trong ray hoặc đặt trục sai giá đỡ", penalty: 100000, keywords: ["cuộn lớn", "ray", "giá đỡ"] },
    { name: "Không áp dụng đúng phương pháp vận chuyển khi thao tác nâng trục", penalty: 100000, keywords: ["trục", "vận chuyển"] },
    { name: "Dùng tay giữ vòng tanh khi điều chỉnh khay", penalty: 100000, keywords: ["vòng tanh", "điều chỉnh khay"] },
    { name: "Đặt bình xăng quá gần máy mài khi nối dây thép, có nguy cơ tia lửa bắn vào", penalty: 100000, keywords: ["bình xăng", "máy mài", "tia lửa"] },
    { name: "Đeo găng tay sợi khi thực hiện thao tác cuộn", penalty: 100000, keywords: ["găng tay sợi", "cuộn"] },
    { name: "Dùng tay giữ cuộn đang quấn", penalty: 100000, keywords: ["cuộn", "tay giữ"] },
    { name: "Không đeo găng tay chịu nhiệt khi thay khuôn tanh", penalty: 100000, keywords: ["găng tay chịu nhiệt", "khuôn tanh"] },
    { name: "Lấy vòng tanh trước khi bộ phận tiếp vòng chuyển đến đúng vị trí lấy", penalty: 100000, keywords: ["vòng tanh", "máy tiếp vòng"] },
    { name: "Vận chuyển xe dụng cụ vượt quá tiêu chuẩn 5 xe", penalty: 100000, keywords: ["xe dụng cụ", "quá 5"] },
    { name: "Sử dụng xe dụng cụ bị hỏng bánh", penalty: 100000, keywords: ["xe dụng cụ", "hỏng bánh"] },
    { name: "Vận chuyển bàn cao su không nhẹ nhàng, cẩn thận", penalty: 100000, keywords: ["bàn cao su", "vận chuyển"] },
    { name: "Nhân viên không đeo nút tai và khẩu trang theo quy định", penalty: 100000, keywords: ["nút tai", "khẩu trang"] },
    { name: "Không vệ sinh phương tiện chữa cháy trong khu vực kịp thời", penalty: 100000, keywords: ["PCCC", "phương tiện chữa cháy"] }
]);

// ------------------------------------------------------
// 7.1.4.12 - QUY TRÌNH CẮT
// ------------------------------------------------------

addViolation("7.1.4.12", "cutting", "Quy trình cắt", [
    { name: "Không giữ khoảng cách trên 3 mét với xe nâng khi xe đang vận chuyển cuộn thép", penalty: 200000, keywords: ["xe nâng", "3 mét", "cuộn thép"] },
    { name: "Làm việc tại đầu máy cắt hoặc dùng tay cuộn vải đệm khi máy đang ở chế độ tự động", penalty: 100000, keywords: ["máy cắt", "chế độ tự động", "vải đệm"] },
    { name: "Xe nâng xếp chồng cuộn lớn khi vận chuyển mà không dùng pallet", penalty: 100000, keywords: ["xe nâng", "cuộn lớn", "pallet"] },
    { name: "Cuộn vải cao vượt chiều cao xe dụng cụ", penalty: 100000, keywords: ["cuộn vải", "xe dụng cụ"] },
    { name: "Dùng chân giẫm lên cuộn lớn khi đang cẩu vận chuyển", penalty: 100000, keywords: ["cẩu cuộn", "giẫm lên cuộn"] },
    { name: "Xếp chồng cuộn rỗng hoặc cuộn sợi lên giá không đúng quy định", penalty: 100000, keywords: ["cuộn rỗng", "giá đỡ"] },
    { name: "Đặt cuộn lớn không đúng vị trí quy định hoặc đặt trực tiếp dưới đất", penalty: 100000, keywords: ["cuộn lớn", "đặt dưới đất"] },
    { name: "Đặt cuộn thép lớn lên giá lưu trữ trục cuộn rỗng", penalty: 100000, keywords: ["cuộn thép", "giá trục cuộn"] }
]);

// ------------------------------------------------------
// 7.1.4.13 - QUY TRÌNH THÀNH HÌNH
// ------------------------------------------------------

addViolation("7.1.4.13", "forming", "Quy trình thành hình", [
    { name: "Đi qua hoặc đến gần khu vực vòng chuyển động khi chưa dừng máy và treo biển cảnh báo", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["vòng chuyển động", "dừng máy", "treo biển"] },
    { name: "Dùng bộ phận cơ thể chạm vào trống thành hình hoặc trống dán hợp khi máy tự động quay", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["trống thành hình", "trống dán hợp", "tự động"] },
    { name: "Sử dụng xăng vượt quá 2/3 bình chứa, để xăng rò rỉ, không đậy kín hoặc đựng xăng trong chai nước", penalty: 100000, keywords: ["xăng", "bình chứa", "chai nước"] },
    { name: "Vươn tay ấn khớp cao su đệm khi vòng chuyển tanh đang hoạt động", penalty: 100000, keywords: ["vòng chuyển tanh", "cao su đệm"] },
    { name: "Không chọc thủng bọt khí trước rồi mới dán mã vạch theo tiêu chuẩn thao tác", penalty: 100000, keywords: ["bọt khí", "mã vạch", "quét mã"] },
    { name: "Đi qua khu vực chuyển động của tay tháo lốp khi máy hoạt động bình thường", penalty: 100000, keywords: ["tay tháo lốp", "khu vực chuyển động"] },
    { name: "Đứng tại vị trí nguy hiểm hoặc không có biện pháp bảo vệ khi xử lý bất thường ở giá sau máy thành hình", penalty: 100000, keywords: ["máy thành hình", "giá sau", "xử lý bất thường"] },
    { name: "Đeo găng tay để ấn, cố định miếng đệm thân lốp nhưng đặt tay sai vị trí", penalty: 100000, keywords: ["găng tay", "miếng đệm", "thân lốp"] },
    { name: "Dùng tay giữ con lăn và bấm nút hộp thao tác không đúng quy định", penalty: 100000, keywords: ["con lăn", "hộp thao tác"] },
    { name: "Đến gần lấy hông lốp khi vòng chuyển tanh đang kẹp và chuyển động", penalty: 100000, keywords: ["vòng chuyển tanh", "hông lốp"] },
    { name: "Thợ chính máy hai trống đứng sai tư thế chân khi lăn ép thân lốp", penalty: 100000, keywords: ["máy hai trống", "lăn ép", "tư thế"] },
    { name: "Không sử dụng gỗ chêm chống va đập cho xe mặt lốp", penalty: 100000, keywords: ["xe mặt lốp", "gỗ chêm"] },
    { name: "Một người kéo vận chuyển từ hai xe phôi lốp trở lên", penalty: 100000, keywords: ["xe phôi lốp", "kéo nhiều xe"] },
    { name: "Lái xe điện kéo xe mặt lốp nhưng không hạ toàn bộ tầng xe xuống", penalty: 100000, keywords: ["xe điện", "xe mặt lốp", "hạ tầng"] },
    { name: "Một nhân viên máy hai trống tự mình thực hiện thao tác lộn hông lốp", penalty: 100000, keywords: ["máy hai trống", "lộn hông lốp"] }
]);
// ------------------------------------------------------
// 7.1.4.14 - QUY TRÌNH LƯU HÓA
// ------------------------------------------------------

addViolation("7.1.4.14", "curing", "Quy trình lưu hóa", [
    { name: "Vào buồng lưu hóa khi chưa chuyển sang chế độ thủ công và thiết bị chưa dừng", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["buồng lưu hóa", "chế độ thủ công", "dừng máy"] },
    { name: "Đi vào phạm vi hoạt động của tay máy khi tay máy đang nâng hạ, quay vào hoặc quay ra", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["tay máy", "robot", "phạm vi hoạt động"] },
    { name: "Đi vào buồng lưu hóa khi khuôn trên chưa nâng đến vị trí và máy lưu hóa thủy lực chưa khóa", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["khuôn trên", "máy lưu hóa thủy lực", "khóa máy"] },
    { name: "Băng qua đường trượt khi xử lý bất thường kẹp lốp sau bơm mà chưa chuyển sang chế độ thủ công", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["đường trượt", "kẹp lốp", "chế độ thủ công"] },
    { name: "Một mình xử lý lốp bị kẹt trên băng tải khi chưa được phê duyệt công việc bất thường", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["băng tải", "kẹt lốp", "xử lý bất thường"] },
    { name: "Thực hiện công việc dưới buồng lưu hóa của máy lưu hóa tịnh tiến", description: "Bao gồm xuyên lỗ, làm sạch ba via, thay bảng chu trình khuôn và vệ sinh bằng đá khô.", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["máy lưu hóa tịnh tiến", "dưới buồng lưu hóa", "vệ sinh khuôn"] },
    { name: "Thiết bị an toàn bị lỗi nhưng vẫn tiếp tục vận hành", penalty: 100000, keywords: ["thiết bị an toàn", "hư hỏng", "vận hành"] },
    { name: "Quét mã vạch phôi lốp khi tay máy đang ở trạng thái tự động", penalty: 100000, keywords: ["tay máy", "quét mã", "phôi lốp"] },
    { name: "Đến gần khu vực chuyển động của tay máy để kiểm tra phôi khi máy đang lắp lốp", penalty: 100000, keywords: ["tay máy", "lắp lốp", "phôi lốp"] },
    { name: "Tự ý chọc hoặc tác động vào van điện từ của máy lưu hóa", penalty: 100000, keywords: ["van điện từ", "máy lưu hóa"] },
    { name: "Đứng ngay phía trước máy lưu hóa khi mở hoặc đóng khuôn", penalty: 100000, keywords: ["mở khuôn", "đóng khuôn", "máy lưu hóa"] },
    { name: "Kéo vận chuyển quá 6 xe phôi lốp", penalty: 100000, keywords: ["xe phôi lốp", "kéo xe", "quá 6"] },
    { name: "Không mở khuôn đến vị trí quy định khi vệ sinh khuôn", penalty: 100000, keywords: ["vệ sinh khuôn", "vị trí khuôn"] },
    { name: "Trèo trực tiếp lên xe phôi lốp lớn để kiểm tra phôi", penalty: 100000, keywords: ["xe phôi lốp lớn", "trèo lên"] },
    { name: "Không dừng băng tải khi xử lý lốp bị kẹt", penalty: 200000, keywords: ["băng tải", "kẹt lốp", "không dừng máy"] },
    { name: "Thò tay vào khe con lăn để kéo lốp", penalty: 200000, keywords: ["con lăn", "kéo lốp", "khe con lăn"] },
    { name: "Trèo lên giá vận chuyển lốp", penalty: 100000, keywords: ["giá vận chuyển lốp", "trèo"] },
    { name: "Công nhân cắt gai không đeo nút tai hoặc kính bảo hộ", penalty: 100000, keywords: ["cắt gai", "nút tai", "kính bảo hộ"] },
    { name: "Không làm sạch kịp thời chất cách ly hoặc dầu trên mặt đất", penalty: 100000, keywords: ["chất cách ly", "dầu", "sàn nhà"] },
    { name: "Đứng trên băng tải để vệ sinh bụi", penalty: 100000, keywords: ["băng tải", "vệ sinh bụi"] },
    { name: "Dùng tay giữ lốp khi mài lốp", penalty: 100000, keywords: ["mài lốp", "giữ lốp"] },
    { name: "Không đặt bình chất tháo khuôn đúng vị trí", penalty: 100000, keywords: ["chất tháo khuôn", "bình"] },
    { name: "Hướng lưỡi dao về phía người khi sử dụng dao cắt gai", penalty: 100000, keywords: ["dao cắt gai", "lưỡi dao"] },
    { name: "Không đặt lốp ổn định khi cắt gai hoặc sửa lốp", penalty: 100000, keywords: ["cắt gai", "sửa lốp", "lốp không ổn định"] },
    { name: "Lật ngược vật nâng trong quá trình cẩu", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["lật khuôn", "vật nâng", "cẩu"] },
    { name: "Làm việc trực tiếp trên khuôn đang được nâng", penalty: 200000, keywords: ["khuôn đang nâng", "cẩu khuôn"] },
    { name: "Dùng tay vịn vào vật nâng hoặc dây treo khi sử dụng cầu trục nâng vật nặng", penalty: 200000, keywords: ["cầu trục", "dây treo", "vật nặng"] },
    { name: "Bulông mặt bích không được lắp đầy đủ", penalty: 200000, keywords: ["bulông", "mặt bích"] },
    { name: "Không lắp chân chống theo yêu cầu", penalty: 100000, keywords: ["chân chống"] },
    { name: "Không đặt dụng cụ bảo vệ khi thay khuôn phao", penalty: 100000, keywords: ["khuôn phao", "dụng cụ bảo vệ"] },
    { name: "Ném dụng cụ mâm cặp từ máy lưu hóa", penalty: 100000, keywords: ["mâm cặp", "ném dụng cụ"] },
    { name: "Đặt vỏ cách nhiệt khuôn đứng tại hiện trường làm việc", penalty: 100000, keywords: ["vỏ cách nhiệt khuôn", "đặt đứng"] },
    { name: "Thay phao trên máy nhưng không sử dụng tấm kê, đặt trực tiếp mâm lên tấm bảo ôn", penalty: 100000, keywords: ["thay phao", "tấm kê", "tấm bảo ôn"] },
    { name: "Sử dụng máy mài góc để mài mặt bên của tấm", penalty: 100000, keywords: ["máy mài góc", "mài mặt bên"] },
    { name: "Sử dụng dụng cụ nâng không đạt yêu cầu để nâng vật", penalty: 100000, keywords: ["dụng cụ nâng", "cẩu", "không đạt chuẩn"] },
    { name: "Nhét quần áo hoặc vật dụng vào xe mặt lốp đang được nâng mở", penalty: 100000, keywords: ["xe mặt lốp", "quần áo", "vật dụng"] },
    { name: "Ngồi, đứng hoặc nằm trên xe mặt lốp; không hạ từng tầng theo đúng thứ tự", penalty: 100000, keywords: ["xe mặt lốp", "ngồi", "đứng", "hạ tầng"] },
    { name: "Hướng lực của dụng cụ sắc nhọn về phía bản thân hoặc người khác", penalty: 100000, keywords: ["dụng cụ sắc nhọn", "hướng lực"] },
    { name: "Dụng cụ, vật tư chiếm dụng lối PCCC, chắn thiết bị chữa cháy hoặc tự ý di chuyển, sử dụng thiết bị chữa cháy", penalty: 100000, keywords: ["lối PCCC", "thiết bị chữa cháy", "chiếm dụng"] },
    { name: "Đặt can xăng, cốc nước hoặc vật dụng trên hộp thao tác điện", penalty: 100000, keywords: ["can xăng", "cốc nước", "hộp thao tác điện"] }
]);

// ------------------------------------------------------
// 7.1.4.15 - KIỂM TRA THÀNH PHẨM
// ------------------------------------------------------

addViolation("7.1.4.15", "inspection", "Kiểm tra thành phẩm", [
    { name: "Dùng dao sửa mép lốp trong khi kiểm tra nhưng không dừng máy", penalty: 100000, keywords: ["dao sửa mép", "kiểm tra lốp", "không dừng máy"] },
    { name: "Đặt tay tại vị trí dễ bị cuốn vào trong bán kính lốp khi kiểm tra", penalty: 100000, keywords: ["kiểm tra lốp", "tay", "cuốn vào"] },
    { name: "Bước lên băng tải hoặc lan can xích bảo vệ trong quá trình kiểm tra", penalty: 100000, keywords: ["băng tải", "lan can xích"] },
    { name: "Đứng trong vùng nguy hiểm màu vàng khi xuống lốp", penalty: 100000, keywords: ["vùng nguy hiểm", "xuống lốp"] },
    { name: "Đeo găng tay trong quá trình kiểm tra theo nội dung quy định tại mục này", penalty: 100000, keywords: ["găng tay", "kiểm tra thành phẩm"] },
    { name: "Vào buồng chì mà không tắt bộ phát cao áp", penalty: 100000, keywords: ["buồng chì", "X-quang", "cao áp"] },
    { name: "Bước lên băng tải trong quá trình quét X-quang", penalty: 100000, keywords: ["X-quang", "băng tải"] },
    { name: "Đi qua hoặc đứng bên trong thanh chắn lốp tại vị trí xuống lốp", penalty: 100000, keywords: ["thanh chắn lốp", "xuống lốp"] },
    { name: "Dùng ống khí thổi ba via nhưng không đeo kính bảo hộ", penalty: 100000, keywords: ["ống khí", "ba via", "kính bảo hộ"] },
    { name: "Không mở xi lanh khí an toàn khi thay vành lốp dưới", penalty: 100000, keywords: ["xi lanh khí", "vành lốp"] },
    { name: "Vành lốp thay thế không được đặt đúng vị trí hoặc để đứng không an toàn", penalty: 100000, keywords: ["vành lốp", "lưu trữ"] },
    { name: "Tự ý mở cửa an toàn trong quá trình kiểm tra", penalty: 100000, keywords: ["cửa an toàn", "kiểm tra"] },
    { name: "Dùng mắt thường nhìn trực tiếp vào đầu phát laser", penalty: 100000, keywords: ["laser", "đầu phát laser"] }
]);

// ------------------------------------------------------
// 7.1.4.16 - QUẢN LÝ KHO
// ------------------------------------------------------

addViolation("7.1.4.16", "warehouse", "Quản lý kho", [
    { name: "Tự ý vào khu vực nguy hiểm của giàn, máy xếp chồng hoặc máy nâng để xử lý bất thường khi chưa được phê duyệt và không có người giám sát", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["giàn", "máy xếp chồng", "máy nâng", "giám sát"] },
    { name: "Tự ý đấu nối, kéo dây điện hoặc sử dụng đồ điện gia dụng trong kho", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["kho", "dây điện", "đồ điện gia dụng"] },
    { name: "Nhân viên bảo trì hoặc kiểm tra làm việc một mình trong hành lang mà không thông báo; người khác tự ý vào", penalty: 100000, keywords: ["hành lang", "làm việc một mình", "thông báo"] },
    { name: "Sử dụng xe nâng để nâng người hoặc dùng xe nâng phục vụ bốc xếp người và hàng không đúng quy định", penalty: 100000, keywords: ["xe nâng", "nâng người", "bốc xếp"] },
    { name: "Không lưu trữ chất dễ cháy trong kho đúng vị trí hoặc không thu dọn kịp thời", penalty: 100000, keywords: ["kho", "chất dễ cháy", "lưu trữ"] },
    { name: "Trèo lên kệ hàng để kiểm kê hoặc vận chuyển hàng hóa", penalty: 100000, keywords: ["kệ hàng", "trèo lên", "kiểm kê"] }
]);

// ------------------------------------------------------
// 7.1.4.17 - NHIỆT ĐIỆN
// ------------------------------------------------------

addViolation("7.1.4.17", "thermal_power", "Nhiệt điện", [
    { name: "Không thực hiện chế độ phiếu công việc và phiếu thao tác đối với công việc nguy hiểm lớn", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["phiếu công việc", "phiếu thao tác", "công việc nguy hiểm"] },
    { name: "Tiếp xúc axit, kiềm, amoniac hoặc hóa chất nguy hiểm mà không mang bảo hộ", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["axit", "kiềm", "amoniac", "hóa chất"] },
    { name: "Vận hành nồi hơi vượt nhiệt độ, áp suất hoặc tải trọng định mức", penaltyText: "Lần đầu phạt 500.000 VNĐ; lần thứ hai chấm dứt hợp đồng lao động.", keywords: ["nồi hơi", "quá nhiệt", "quá áp", "quá tải"] },
    { name: "Không mang theo dụng cụ an toàn khi kiểm tra hoặc thao tác thiết bị", penalty: 200000, keywords: ["dụng cụ an toàn", "kiểm tra thiết bị"] },
    { name: "Sử dụng cáp điện không đạt cách điện hoặc lớp vỏ bị hư hỏng", penalty: 200000, keywords: ["cáp điện", "cách điện", "hư hỏng"] },
    { name: "Làm việc trong không gian kín hoặc thùng chứa không có người giám sát, chiếu sáng không dùng điện áp an toàn", penalty: 200000, keywords: ["không gian kín", "thùng chứa", "điện áp an toàn"] },
    { name: "Ngủ gật trong quá trình giám sát thiết bị", penalty: 100000, keywords: ["ngủ gật", "giám sát thiết bị"] },
    { name: "Không đeo găng tay chịu nhiệt khi bảo trì hoặc vận hành thiết bị, dụng cụ, van", penalty: 100000, keywords: ["găng tay chịu nhiệt", "van", "bảo trì"] },
    { name: "Lên xuống cầu thang ngoài trời không nắm tay vịn, đút tay trong túi", penalty: 100000, keywords: ["cầu thang", "tay vịn"] }
]);

// ------------------------------------------------------
// 7.1.4.18 - QUY ĐỊNH CÔNG VIỆC ĐIỆN CHI TIẾT
// ------------------------------------------------------

addViolation("7.1.4.18", "electrical_detail", "Công việc điện chi tiết", [
    { name: "Sửa chữa đường dây cao thế không cắt điện, không kiểm tra điện và không mang đúng BHLĐ", penaltyText: "Chấm dứt hợp đồng lao động.", keywords: ["đường dây cao thế", "cắt điện", "BHLĐ"] },
    { name: "Người không có chuyên môn điện thực hiện đấu nối điện hoặc thợ điện làm việc khi đang có điện", penaltyText: "Chấm dứt hợp đồng lao động.", keywords: ["đấu nối điện", "thợ điện", "điện sống"] },
    { name: "Đèn làm việc hoặc đèn chiếu sáng cục bộ không dùng điện áp an toàn; khu vực ẩm hoặc thùng kim loại không dùng điện áp siêu thấp", penalty: 200000, keywords: ["đèn làm việc", "điện áp an toàn", "thùng kim loại"] },
    { name: "Thiết bị bảo vệ chống rò điện hỏng hoặc ổ cắm trong tủ điều khiển không có CB chống giật", penalty: 200000, keywords: ["CB chống giật", "chống rò điện", "tủ điện"] },
    { name: "Không bọc cách điện đầu dây trần sau khi làm việc", penalty: 200000, keywords: ["đầu dây trần", "bọc cách điện"] },
    { name: "Thiết bị đóng cắt trong tủ phân phối điện không được cố định hoặc bị rơi", penalty: 100000, keywords: ["tủ phân phối điện", "thiết bị đóng cắt"] },
    { name: "Không vệ sinh bụi trong tủ hoặc hộp phân phối điện kịp thời", penalty: 100000, keywords: ["bụi tủ điện", "vệ sinh"] },
    { name: "Dùng dụng cụ điện không có cách điện kép trong khu vực ẩm, thùng chứa hoặc kết cấu kim loại", penalty: 100000, keywords: ["cách điện kép", "khu vực ẩm"] },
    { name: "Đường điện tạm chưa được phê duyệt hoặc không treo biển cảnh báo", penalty: 200000, keywords: ["điện tạm", "phê duyệt", "biển cảnh báo"] },
    { name: "Dụng cụ điện cầm tay không có thiết bị chống rò độc lập hoặc dây nguồn hỏng, có mối nối, dài quá quy định", penalty: 100000, keywords: ["dụng cụ điện cầm tay", "chống rò", "dây nguồn"] },
    { name: "Cửa tủ, hộp hoặc bảng điện điều khiển không khóa", penalty: 100000, keywords: ["tủ điện", "khóa cửa"] },
    { name: "Thiết bị điện không lắp trong tủ điện hoặc không cố định chắc chắn", penalty: 100000, keywords: ["thiết bị điện", "tủ điện", "cố định"] },
    { name: "Cửa tủ phân phối điện không có dây nối liên kết với thân tủ", penalty: 100000, keywords: ["cửa tủ điện", "dây nối đất"] },
    { name: "Các hành vi khác không tuân thủ quy định quản lý an toàn sử dụng điện", penaltyText: "Áp dụng mức phạt theo kết quả đánh giá mức độ rủi ro của hành vi không an toàn.", keywords: ["an toàn điện", "đánh giá rủi ro"] }
]);

// ------------------------------------------------------
// 7.1.4.19 - QUẢN LÝ HÓA CHẤT NGUY HIỂM
// ------------------------------------------------------

addViolation("7.1.4.19", "chemical", "Quản lý hóa chất nguy hiểm", [
    { name: "Tủ hóa chất nguy hiểm không thực hiện quản lý hai người, hai khóa", penalty: 200000, keywords: ["tủ hóa chất", "hai người hai khóa"] },
    { name: "Không dán MSDS tại hiện trường hoặc MSDS đã hết hạn (thời hạn hiệu lực 5 năm)", penalty: 100000, keywords: ["MSDS", "hóa chất", "hết hạn"] },
    { name: "Axit clohidric, xăng dầu hoặc hóa chất nguy hiểm không được lưu trữ đúng vị trí", penalty: 100000, keywords: ["axit clohidric", "xăng dầu", "lưu trữ"] },
    { name: "Túi lưu huỳnh còn bột dư nhưng không làm sạch trước khi đưa vào kho phế liệu", penalty: 100000, keywords: ["lưu huỳnh", "bột dư", "kho phế liệu"] },
    { name: "Sơn không được đưa vào kho quản lý hoặc thùng sơn đã dùng không đưa về kho", penalty: 100000, keywords: ["sơn", "thùng sơn", "kho"] },
    { name: "Không lắp vòi rửa mắt trong phạm vi 15 mét quanh khu vực lưu trữ hóa chất hoặc vòi rửa mắt bị hỏng", penalty: 100000, keywords: ["vòi rửa mắt", "15 mét", "hóa chất"] },
    { name: "Tủ hóa chất nguy hiểm không được nối đất hoặc hệ thống nối đất bị hỏng", penalty: 100000, keywords: ["tủ hóa chất", "nối đất"] }
]);

// ------------------------------------------------------
// 7.1.4.20 - THIẾT BỊ ĐẶC CHỦNG
// ------------------------------------------------------

addViolation("7.1.4.20", "special_equipment", "Thiết bị đặc chủng", [
    { name: "Thiết bị đặc chủng có nguy cơ mất an toàn nghiêm trọng nhưng không báo cáo, vẫn tiếp tục vận hành", penaltyText: "Chấm dứt hợp đồng lao động.", keywords: ["thiết bị đặc chủng", "nguy cơ nghiêm trọng", "không báo cáo"] },
    { name: "Dùng cơ thể để giữ thăng bằng hoặc làm điểm tựa khi nâng, cẩu, xe nâng hoặc di chuyển vật", penalty: 400000, keywords: ["dùng cơ thể", "nâng cẩu", "xe nâng", "vật nặng"] },
    { name: "Tự ý di dời hoặc thanh lý thiết bị đặc chủng không theo quy định", penalty: 400000, keywords: ["di dời", "thanh lý", "thiết bị đặc chủng"] },
    { name: "Tự ý cải tạo hoặc sửa đổi thiết bị đặc chủng không theo quy định", penalty: 400000, keywords: ["cải tạo", "sửa đổi", "thiết bị đặc chủng"] },
    { name: "Dùng thang máy chở hàng để vận chuyển người, trừ nhân viên vận hành thang máy", penalty: 200000, keywords: ["thang máy chở hàng", "chở người"] },
    { name: "Phụ kiện an toàn của thiết bị đặc chủng hư hỏng, thiếu hoặc hết hạn nhưng không sửa chữa, thay thế, báo cáo kịp thời", penalty: 200000, keywords: ["phụ kiện an toàn", "thiết bị đặc chủng", "hết hạn"] },
    { name: "Các hành vi khác không phù hợp quy định quản lý an toàn thiết bị đặc chủng", penaltyText: "Áp dụng mức phạt theo kết quả đánh giá mức độ rủi ro của hành vi không an toàn.", keywords: ["thiết bị đặc chủng", "đánh giá rủi ro"] }
]);
// ======================================================
// QUY ĐỊNH CHUNG ÁP DỤNG CHO VIỆC XỬ LÝ VI PHẠM
// ======================================================

const regulationRules = {
    generalPenalty: {
        article: "7.1.1.2",
        content: "Thưởng phạt kinh tế và thưởng phạt hành chính được thực hiện đồng thời."
    },

    managerViolation: {
        article: "7.1.1.2",
        content: "Người quản lý trực tiếp vi phạm sẽ bị tăng gấp đôi hình phạt."
    },

    employeeRepeatViolation: {
        article: "7.1.1.2",
        content: "Nhân viên tái phạm sẽ bị xử phạt tăng nặng."
    },

    managerJointResponsibility: {
        article: "7.1.1.2",
        content: "Khi nhân viên vi phạm, người quản lý của nhân viên đó phải chịu trách nhiệm liên đới."
    },

    riskMatrix: {
        article: "7.1.1.3",
        formula: "R = L × S",
        description: "Đánh giá rủi ro dựa trên khả năng xảy ra tai nạn (L) và mức độ nghiêm trọng của hậu quả (S).",
        levels: [
            {
                risk: "1–8",
                penaltyText: "Phạt tài chính 100.000 VNĐ. Nhân viên có thành tích tốt, lần đầu vi phạm có thể được miễn phạt tiền, nhưng vẫn bị phê bình, cảnh cáo và phải kiểm điểm an toàn."
            },
            {
                risk: "9–12",
                penaltyText: "Phạt tài chính 200.000 VNĐ. Nhân viên có thành tích tốt, lần đầu vi phạm có thể được miễn phạt tiền và bị xử lý hành chính bằng đào tạo, giáo dục tại vị trí."
            },
            {
                risk: "15–16",
                penaltyText: "Lần đầu phạt 500.000 VNĐ và xử lý hành chính bằng hình thức đình chỉ thực tập; lần thứ hai chấm dứt hợp đồng lao động."
            },
            {
                risk: "20–25",
                penaltyText: "Trường hợp nghiêm trọng sẽ bị chấm dứt hợp đồng lao động."
            }
        ],
        priority: "Đối với các hành vi vi phạm đã được quy định cụ thể tại mục 7.1.4, ưu tiên áp dụng mức phạt tại mục 7.1.4."
    },

    relatedParties: {
        article: "7.1.2",
        content: "Vi phạm của bên liên quan do bộ phận quản lý trực tiếp điều tra xử lý thì bộ phận đó trực tiếp xử phạt. Trường hợp Bộ phận An toàn và Môi trường phát hiện, xử lý thì có thể truy cứu trách nhiệm đơn vị liên quan, cán bộ quản lý bộ phận công ty và người quản lý khu vực."
    },

    approval: {
        article: "7.1.3.1",
        content: "Thưởng phạt do bộ phận quản lý hoặc cấp trên đề xuất, sau khi được người phụ trách bộ phận hoặc lãnh đạo phụ trách phê duyệt mới được ban hành và thực hiện."
    },

    accident: {
        article: "7.1.5",
        content: "Xử phạt cán bộ quản lý liên quan đến tai nạn lao động thực hiện theo Quy định quản lý tai nạn lao động. Trường hợp cùng công đoạn hoặc vị trí thiết bị tương tự trong phạm vi Tập đoàn đã từng xảy ra tai nạn và tiếp tục xảy ra tai nạn lặp lại, người chịu trách nhiệm liên quan bị xử phạt gấp đôi theo tiêu chuẩn."
    }
};

// ======================================================
// THÔNG TIN TỔNG KẾT DỮ LIỆU
// ======================================================

const violationDataSummary = {
    regulationCode: regulationInfo.code,
    regulationName: regulationInfo.title,
    version: regulationInfo.version,
    issuedDate: regulationInfo.issuedDate,
    effectiveDate: regulationInfo.effectiveDate,
    totalViolations: violations.length,
    categories: [
        "Hành vi vi phạm nghiêm trọng",
        "Hành vi không an toàn",
        "Trang bị bảo hộ lao động",
        "Phương tiện, xe nâng và xe điện",
        "Vận hành thiết bị",
        "An toàn PCCC",
        "Công việc nguy cơ cao",
        "Công việc điện",
        "Quản lý an toàn",
        "Quy trình luyện cao su",
        "Quy trình ép đùn",
        "Quy trình cắt",
        "Quy trình thành hình",
        "Quy trình lưu hóa",
        "Kiểm tra thành phẩm",
        "Quản lý kho",
        "Nhiệt điện",
        "Công việc điện chi tiết",
        "Quản lý hóa chất nguy hiểm",
        "Thiết bị đặc chủng"
    ]
};

// ======================================================
// KẾT THÚC DATA VIOLATIONS
// ======================================================