// การกำหนดการตั้งค่า API key
const count = 10;
const apiKey = config.API_KEY;
<<<<<<< HEAD
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=desk-setup`;

// กำหนดตัวแปร หรือ การอ้างอิงตัวแปร
const imageContainer = document.getElementById('img-container');
let photoArr = [
    // { id: 1, urls: { regular: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e' } },
    // { id: 2, urls: { regular: 'https://images.unsplash.com/photo-1542751371-adc38448a05e' } },
]; // เดียวใส่ข้อมูลปลอมไปก่อน
=======
// const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=desk-setup`;

// กำหนดตัวแปร
const imageContainer = document.getElementById('img-container');
let photoArr = [];
>>>>>>> 1b849669abdc7de323819bf177bc2a08216c9878

// ✨ 1. เพิ่มตัวแปรนี้: เอาไว้เช็คว่า "พร้อมจะโหลดหรือยัง?"
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

<<<<<<< HEAD
// local storage เก็บค่าเมื่อ Refesh หน้าเว็บ
function local() {
    localStorage.setItem('img-list', JSON.stringify(favorite));
}
// 2. ตอนดึงออกมาใช้ (แก้ใหม่)
// แปลว่า: ไปดึง 'img-list' มานะ -> ถ้ามีของให้แกะห่อ (Parse) -> ถ้าไม่มี (null) ให้เป็น array ว่าง []
=======
// local storage 
function local() {
    localStorage.setItem('img-list', JSON.stringify(favorite));
}
    // 2. ตอนดึงออกมาใช้ (แก้ใหม่)
    // แปลว่า: ไปดึง 'img-list' มานะ -> ถ้ามีของให้แกะห่อ (Parse) -> ถ้าไม่มี (null) ให้เป็น array ว่าง []
>>>>>>> 1b849669abdc7de323819bf177bc2a08216c9878
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
<<<<<<< HEAD
        fav.classList.add('fav-btn');

        // แปลว่า: "ช่วยไปส่องดูในกระเป๋า favorite หน่อยซิ..."
        // "ว่ามีใบไหนที่ ID ตรงกับรูปที่ฉันถืออยู่ตอนนี้ไหม?"
        const isLike = favorite.some(favItem => favItem.id === photo.id)

        // ถ้าเจอ (isLike = true) -> ❤️
        // ถ้าไม่เจอ (isLike = false) -> 🩶S
=======
        const isLike = favorite.includes(photo.alt_description)
>>>>>>> 1b849669abdc7de323819bf177bc2a08216c9878
        if (isLike) {
            fav.innerText = '❤️';
        } else {
            fav.innerText = '🩶';
        }

<<<<<<< HEAD
        // --------------------------------------------------
        // 🧩 จิ๊กซอว์ที่ 1: สั่งให้ปุ่มทำงานเมื่อถูกกด
        // --------------------------------------------------

        fav.addEventListener('click', () => {
            // หา index ก่อน
            const findIndex = favorite.findIndex(item => item.id === photo.id)

            if (findIndex !== -1) { //ถ้าเจอให้ทำอะไร
                favorite.splice(findIndex,1);
                fav.innerText = '🩶';
            } else {
                const dataFav = {
                    id: photo.id,
                    urls: {
                        regular: photo.urls.regular
                    },
                    links: {
                        html: photo.links.html
                    },
                    alt_description: photo.alt_description
                }

                favorite.push(dataFav);
                fav.innerText = '❤️';
            }

            // save ลง localStorage
            local();
            console.log('Updated Favorites:', favorite);
        })

=======
>>>>>>> 1b849669abdc7de323819bf177bc2a08216c9878
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

<<<<<<< HEAD
        // ยัด Button (Fav) ลงไปก่อน
        wrapper.appendChild(fav);

        // ยัด Loader ลงไปก่อน
        wrapper.appendChild(loader);

=======
        // ยัด Loader ลงไปก่อน
        wrapper.appendChild(loader);
>>>>>>> 1b849669abdc7de323819bf177bc2a08216c9878
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

<<<<<<< HEAD
function showFavorites() {
    // clear หน้า Web
    imageContainer.innerHTML = '';

    photoArr = favorite;
    displayImage();

    //ถอดปลั๊กเน็ต (Stop Scrolling)
    ready = false;
}

getPhotos();

// addEvent
=======
getPhotos();

>>>>>>> 1b849669abdc7de323819bf177bc2a08216c9878
window.addEventListener('scroll', () => {
    // ✨ 4. เพิ่มเงื่อนไข: ต้อง ready = true เท่านั้นถึงจะโหลดใหม่ได้
    // และเพิ่ม -1000 เพื่อให้โหลดล่วงหน้าก่อนจะกระแทกพื้น
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) { // ถ้า scroll มาแนวตั้ง แล้วมากกว่า body ไปแล้วให้ทำอะไร
        ready = false;
        getPhotos();
    }
})
<<<<<<< HEAD
=======
console.log(photoArr)
>>>>>>> 1b849669abdc7de323819bf177bc2a08216c9878
