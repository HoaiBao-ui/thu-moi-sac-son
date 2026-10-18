// Khai báo danh sách ảnh và âm thanh
const pagesList = [
  "thu_moi_sac_son_da_sua/assets/pages/01-bia.jpg",
  "thu_moi_sac_son_da_sua/assets/pages/02-loi-moi.jpg",
  "thu_moi_sac_son_da_sua/assets/pages/03-gioi-thieu.jpg",
  "thu_moi_sac_son_da_sua/assets/pages/04-thong-tin.jpg",
  "thu_moi_sac_son_da_sua/assets/pages/05-loi-nhan.jpg",
  "thu_moi_sac_son_da_sua/assets/pages/06-ket-thuc.jpg"
];

const audioFile = "thu_moi_sac_son_da_sua/assets/audio/bgm.mp3";

// Tự động tương thích với mọi cách gọi biến trong script.js
var CONFIG = { pages: pagesList, audio: audioFile };
var config = { pages: pagesList, audio: audioFile };
window.CONFIG = CONFIG;
window.config = config;
