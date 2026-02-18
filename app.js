// การกำหนดการตั้งค่า API key
const count = 10;
const apiKey = config.API_KEY;
// const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=desk-setup`;

// กำหนดตัวแปร
const imageContainer = document.getElementById('img-container');
let photoArr = [];

// ✨ 1. เพิ่มตัวแปรนี้: เอาไว้เช็คว่า "พร้อมจะโหลดหรือยัง?"
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// local storage 
function local() {
    localStorage.setItem('img-list', JSON.stringify(favorite));
}
    // 2. ตอนดึงออกมาใช้ (แก้ใหม่)
    // แปลว่า: ไปดึง 'img-list' มานะ -> ถ้ามีของให้แกะห่อ (Parse) -> ถ้าไม่มี (null) ให้เป็น array ว่าง []
let favorite = JSON.parse(localStorage.getItem('img-list')) || [];

// function ต่างๆ
async function getPhotos() { // ไปร้องขอข้อมูลจาก API แล้วรอให้เสร็จก่อนโดยใส่ async, await ไว้ด้วยค่อยทำงานต่อ
    try {
        const response = await fetch(apiUrl);
        photoArr = await response.json();

        // ✨ 2. ก่อนจะไปวาดรูป เซ็ตค่าใหม่ก่อน
        imagesLoaded = 0;
        totalImages = photoArr.length;
        displayImage();
    } catch (err) {
        console.log(err)
    }
}

function displayImage() {
    photoArr.forEach((photo) => {
        // check local storage ว่ามีใน favorite ไหม
        const fav = document.createElement('button');
        const isLike = favorite.includes(photo.alt_description)
        if (isLike) {
            fav.innerText = '❤️';
        } else {
            fav.innerText = '🩶';
        }

        // 1. สร้าง Link (<a>) และ Image (<img>) ตามปกติ
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('title', photo.alt_description);
        img.setAttribute('alt', photo.alt_description);

        // ✨ เริ่มต้น: ซ่อนรูปไว้ก่อน (ยังไม่ให้เห็น จนกว่าจะโหลดเสร็จ)
        img.style.display = 'none';

        // 2. สร้าง Loader (ตัวหมุนๆ)
        const loader = document.createElement('div');
        loader.classList.add('loading'); // ใช้ CSS Class ที่คุณเตรียมไว้

        // 3. ✨ สร้างกล่อง Wrapper เพื่อเก็บทั้ง Loader และ รูป ให้อยู่ที่เดียวกัน
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative'; // จัด Layout ให้อยู่ในกรอบ

        // ยัด Loader ลงไปก่อน
        wrapper.appendChild(loader);
        // ยัด <a> ลงไป (ข้างในมีรูปที่ถูกซ่อนอยู่)
        wrapper.appendChild(item);
        item.appendChild(img);

        // 4. ✨ The Magic: เช็คว่ารูปโหลดเสร็จหรือยัง?
        img.addEventListener('load', () => {
            loader.remove(); // ลบตัวหมุนๆ ทิ้ง
            img.style.display = 'block'; // โชว์รูปภาพขึ้นมา

            // ✨ 3. เช็คว่าโหลดครบทุกรูปในเซ็ตนี้หรือยัง?
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                ready = true; // โหลดครบแล้ว! เปิดประตูให้ scroll ขอชุดต่อไปได้
                console.log("พร้อมโหลดชุดต่อไปแล้ว ✅");
            }
        });

        // 5. เอา Wrapper ไปแปะหน้าเว็บ
        imageContainer.appendChild(wrapper);
    });
}

getPhotos();

window.addEventListener('scroll', () => {
    // ✨ 4. เพิ่มเงื่อนไข: ต้อง ready = true เท่านั้นถึงจะโหลดใหม่ได้
    // และเพิ่ม -1000 เพื่อให้โหลดล่วงหน้าก่อนจะกระแทกพื้น
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) { // ถ้า scroll มาแนวตั้ง แล้วมากกว่า body ไปแล้วให้ทำอะไร
        ready = false;
        getPhotos();
    }
})
console.log(photoArr)