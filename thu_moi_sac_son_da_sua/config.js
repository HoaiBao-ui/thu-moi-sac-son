/*
  CHỈ CẦN SỬA FILE NÀY ĐỂ ĐỔI TÊN SỰ KIỆN, ẢNH VÀ NHẠC.
  Hãy đặt đúng 6 ảnh trong assets/pages theo tên trong danh sách.
*/
window.INVITATION_CONFIG = {
  eventTitle: "SẮC SON",
  welcomeTitle: "Sắc Son",
  subtitle: "Chữ duyên nối lại, trọn đường sắc son",
  description: "Đám cưới miền Tây xưa",
  kicker: "TRÂN TRỌNG KÍNH MỜI",
  footerNote: "Một lời mời trân trọng, một kỷ niệm đáng nhớ.",

  showCoverImage: true,
  coverImage: "assets/pages/01-bia.jpg.jpg",

  pages: [
    "assets/pages/01-bia.jpg.jpg",
    "assets/pages/02-loi-moi.jpg.jpg",
    "assets/pages/03-gioi-thieu.jpg.jpg",
    "assets/pages/04-thong-tin.jpg.jpg",
    "assets/pages/05-loi-nhan.jpg.jpg",
    "assets/pages/06-ket-thuc.jpg.jpg"
  ],

  // Nếu dùng PDF: đặt pages: [] và nhập đường dẫn file vào pdf.
  pdf: "",
  music: "assets/audio/nhac-nen.mp3.mp3",
  pageWidth: 420,
  pageHeight: 594
};
