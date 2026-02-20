require('dotenv').config(); // 1. เรียกใช้ตู้เซฟ เพื่อดึงรหัสผ่านจากไฟล์ .env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Favorite = require('./models/Favorite'); // 2. ดึงพิมพ์เขียว (Schema) ที่เราสร้างไว้มาใช้งาน

// สร้างตัวแปร
const app = express(); // เรียกใช้ express app
const PORT = 3000; // เลขตั้งที่อยู่

app.use(cors()) //ใช้ cors เพื่ออนุญาตให้หน้าเว็บฝั่ง Frontend วิ่งเข้ามาคุยได้
app.use(express.json()) // เพื่อให้เซิร์ฟเวอร์อ่านข้อมูลแบบ JSON ที่จะส่งมาทีหลังได้)

// เชื่อมต่อฐานข้อมูล MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connection to MogoDB Atlas! (เชื่อมต่อ)'))
    .catch((err) => console.error('MongoDB Connection Error: ', err));

// สร้างเส้นทางหน้าแรกของ web
app.get('/', (req, res) => {
    res.send('BackEnd ของ DreamDesk พร้อมทำงานแล้ว');
})

    // เส้นทางขอดูรูปทั้งหมด
app.get('/api/favorites', async (req, res) => {
    const fav = await Favorite.find(); // เอาข้อมูลของ array FavoriteSchema มาทั้งหมด
    try {
        res.json(fav);
    } catch (error) {
        console.log(error);
    }
})
    // เส้นทางฝากเซฟรูปให้หน่อย
app.get('/api/favorites', async (req, res) => {
   const newFav = new Favorite(req.body)
})

// สั่งเปิด sever
app.listen(PORT, console.log('sever run เรียบร้อย'));