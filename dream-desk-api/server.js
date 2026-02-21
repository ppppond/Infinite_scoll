require('dotenv').config(); // 1. เรียกใช้ตู้เซฟ เพื่อดึงรหัสผ่านจากไฟล์ .env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Favorite = require('./models/Favorite'); // 2. ดึงพิมพ์เขียว (Schema) ที่เราสร้างไว้มาใช้งาน

// สร้างตัวแปร
const app = express(); // เรียกใช้ express app

app.use(cors()) //ใช้ cors เพื่ออนุญาตให้หน้าเว็บฝั่ง Frontend วิ่งเข้ามาคุยได้
app.use(express.json()) // เพื่อให้เซิร์ฟเวอร์อ่านข้อมูลแบบ JSON ที่จะส่งมาทีหลังได้) เพื่อให้สามารถแกะกล่องจาก app.js

// console.log("👉 แอบดู URL จาก .env:", process.env.MONGO_URL);

// เชื่อมต่อฐานข้อมูล MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connection to MogoDB Atlas! (เชื่อมต่อ)'))
    .catch((err) => console.error('MongoDB Connection Error: ', err));

// สร้างเส้นทางหน้าแรกของ web
app.get('/', (req, res) => {
    res.send('BackEnd ของ DreamDesk พร้อมทำงานแล้ว');
})

// เส้นทางขอดูรูปทั้งหมด (GET)
app.get('/api/favorites', async (req, res) => {
    try {
        const fav = await Favorite.find(); // เอาข้อมูลของ array FavoriteSchema มาทั้งหมด
        res.json(fav);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
// เส้นทางฝากเซฟรูปให้หน่อย (POST)
app.post('/api/favorites', async (req, res) => { 
    // เดินเข้าช่องทางที่ถูกต้อง (app.post('/api/favorites')): เซิร์ฟเวอร์เห็นว่าไรเดอร์มาส่งของแบบ POST ตรงกับป้ายที่แขวนไว้ ก็เลยเปิดประตูรับ
    try {
        // ข้อมูลที่หน้าเว็บส่งมาจะถูกเก็บอยู่ในกระเป๋าที่ชื่อว่า req.body
        /* QC ตรวจสอบคุณภาพ (new Favorite(req.body)): เซิร์ฟเวอร์จะเอาข้อมูลในตะกร้า req.body ไปเทียบกับ "พิมพ์เขียว" (Schema) 
        ในไฟล์ models/Favorite.js ว่า: มี id ไหม? (required: true)

มีรูป url ไหม?

id นี้เคยมีคนส่งมาซ้ำหรือยัง? (unique: true)
ถ้าข้อมูลเน่า ขาดหาย หรือซ้ำ มันจะเตะพัสดุกล่องนี้ทิ้งทันที แล้วกระโดดไปหา catch (err) เพื่อส่งด่ากลับไปหน้าเว็บ*/
        const newFav = new Favorite(req.body); // สร้าง model

        /* สั่งเซฟลงโกดัง (await newFav.save()): คำสั่ง .save() เป็นเวทมนตร์ของ Mongoose ครับ 
        มันจะแปลงคำสั่ง JavaScript ของเรา ให้กลายเป็นภาษาที่ MongoDB เข้าใจ แล้วส่งข้อมูลวิ่งขึ้น Cloud ไปเก็บบนเว็บ MongoDB Atlas อย่างถาวร */
        
        const savFav = await newFav.save(); 
        /* ออกใบเสร็จ (res.status(201).json(savFav)): เมื่อ MongoDB ตอบกลับมาว่า 
        "เก็บของเข้าชั้นวางเรียบร้อย!" เซิร์ฟเวอร์ก็จะตีตราปั๊ม รหัส 201 (Created = สร้างสำเร็จ) 
        พร้อมกับส่งหน้าตาข้อมูลที่เซฟเสร็จแล้ว กลับไปให้หน้าเว็บ (Frontend) เพื่อเป็นการบอกว่า "มิชชั่นคอมพลีท 
        พี่เปลี่ยนสีปุ่มหัวใจเป็นสีแดงได้เลย!" */
        res.status(201).json(savFav);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

//เส้นทาง "เลิกชอบแล้ว ลบทิ้งที" (DELETE)
app.delete('/api/favorites/:id', async (req, res) => { /* 
        req.params คือ Object ใน Express.js (Node.js) ที่ใช้เก็บค่าพารามิเตอร์ที่ระบุไว้ใน URL เส้นทาง (Route Path) 
        ซึ่งมักใช้ดึงข้อมูลเฉพาะเจาะจง เช่น ID ของผู้ใช้ หรือ ID ของสินค้า 
    */
    try {
        const deleteFav = await Favorite.findOneAndDelete({ id: req.params.id }) // ดึง id
        res.json({ message: 'ลบสำเร็จ' })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

})

// สั่งเปิด sever
app.listen(process.env.PORT, () => console.log('sever run เรียบร้อย'));