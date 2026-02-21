const mongoose = require('mongoose');

// ร่างพิมพ์เขียว (ออกแบบหน้าตาข้อมูลให้เหมือนกับที่ Unsplash ส่งมา)
// 🛠️ ฝั่ง Backend (ไฟล์ models/Favorite.js ที่คุณต้องสร้าง)
// เอาหน้าตาของ dataFav ด้านบน มาเปลี่ยนค่าข้างหลังเป็น "ชนิดข้อมูล" (Type)
const FavoriteSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true }, // กันการเซฟรูปซ้ำ
    urls: {
        regular: {type: String, required: true} // required คือ จำเป็นต้องมีข้อมูล
    },
    links: {
        html: {type: String}
    },
    alt_description: {type: String}
})

module.exports = mongoose.model('Favorite', FavoriteSchema)