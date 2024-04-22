<template>
    <div class="home">
        <div class="img-home-page">
            <img src="D:\Phát Triển Ứng Dụng WEB\project\Project_WEB\frontend\public\img\Giấy Dán Tường.jpg" alt="">
        </div>
        <div class="main">
            <div class="about-container">
                <div class="img">
                    <img src="D:\Phát Triển Ứng Dụng WEB\project\Project_WEB\frontend\public\img\sach_tri_thuc.jpg" alt="">
                </div>
                <div class="info-us">
                    <h2>About Us</h2>
                    <p>Enriching library experience: Extensive collection, academic support, lifelong learning, cultural enrichment, digital resources, collaborative spaces, and accessibility. Join us for discovery, growth, and inspiration.</p>
                </div>
            </div>
        </div>
        <div class="address">
            <div class="addr-container">
                <div class="info-contact">
                    <h1>Contact</h1>
                    <ul>
                        <li class="info-contact__item"><i class="fa-solid fa-location-dot"></i> 3/2 Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam</li>
                        <li class="info-contact__item"><i class="fa-solid fa-envelope"></i> anhb2113304@student.ctu.edu.vn</li>
                        <li class="info-contact__item"><i class="fa-solid fa-phone"></i>0394024287</li>
                        <li class="info-contact__item"><i class="fa-brands fa-facebook"></i> https://www.facebook.com/CTU.dtn.cntttt</li>
                    </ul>
                </div>
                <div class="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.847550227907!2d105.76916295382193!3d10.031020792038023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883d2192b0f1%3A0x4c90a391d232ccce!2zVHLGsOG7nW5nIEPDtG5nIE5naOG7hyBUaMO0bmcgVGluIHbDoCBUcnV54buBbiBUaMO0bmcgKENUVSk!5e0!3m2!1svi!2s!4v1700709535623!5m2!1svi!2s" 
                width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import contactService from '../services/book.service';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'Home',
    data() {
        return {}
    },
};
</script>

<style scoped>
    .home{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: relative;
        top: -70px; 
        background: white;
    }

    .main{
        width: 100%;
        background-color: var(--black);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 10px;
        margin: 10px;
        background: #000;
        border-radius: 20px;
        box-shadow: 5px 5px 5px #3f3e3e;

    }
    .about-container{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: var(--black-2);
        width: 90%;
        height: 400px;
        border-radius: 15px;
        margin: 10px;
    }

    .img-home-page {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background: #000;
        border-radius: 20px;
        box-shadow: 5px 5px 5px #3f3e3e;    
    }

    .img{
        display: flex;
        align-items: center;
        border-radius: 20px;
        overflow: hidden;
    }
    .img img{
        height: 350px;
        width: 400px;
        padding: 10px;
        border-radius: 20px;
    }

    .info-us{
        width: 400px;
        height: auto;
        padding: 10px;
        font-size: 20px;
        color: var(--white);
    }
    .contact{
        /* margin: 20px; */
        display: flex;
        height: 500px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 90%;
        background-color: var(--black-2);
        border-radius: 20px;
        padding: 10px;
        margin: 10px;
    }

    .contact-title{
        color: var(--white);
        font-size: 50px;
        font-weight: 900;
        margin-bottom: 10px;
    }

    .contact-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        margin-bottom: 10px;
    }

    .contact-item_child{
        margin-bottom: 5px;
        width: 100%;
    }

    .special{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    
    .special-item{
        width: 90%;
        height: 50px;
        /* border: 2px solid var(--white); */
        border-radius: 50px;
        padding-left: 25px;
    }

    .input{
        padding-left: 25px;
        width: 100%;
        height: 50px;
        /* border: 2px solid var(--white); */
        border-radius: 50px;
    }

    .special-item::placeholder,
    .input::placeholder {
        color: var(--placeholder-color); /* Add your desired placeholder color */
        opacity: 0.7; /* Adjust the opacity as needed */
    }

    .btn{
        background-color: transparent;
        color: var(--white);
        font-weight: 600;
        font-size: 20px;
        width: 50%;
        padding: 10px;
        border: 2px solid var(--white);
        margin-bottom: 10px;
    }

    .btn:hover{
        background-color: var(--white);
        color: var(--black);
    }

    .address{
        width: 100%;
        height: 500px;
        background-color: var(--black);
        background: #000;
        border-radius: 20px;
        box-shadow: 5px 5px 5px #3f3e3e;
    }

    .addr-container{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .info-contact{
        color: var(--white);
        width: 30%;
        height: 200px;
        font-size: 20px;
    }

    .map{
        padding-right: 50px;
        width: 40%;
        margin-top: 25px ;
    }
</style>