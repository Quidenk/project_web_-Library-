<template>
    <div class="footer">
        <div class="icon">
            <div class="icon-item"><i class="fa-brands fa-facebook"></i></div>
            <div class="icon-item"><i class="fa-brands fa-instagram"></i></div>
            <div class="icon-item"> <i class="fa-brands fa-youtube"></i></div>
            <div class="icon-item"><i class="fa-brands fa-twitter"></i></div>
        </div>

        <div class="row">
            <ul>
                <li class="row-item">Contact us</li>
                <li class="row-item">Our Services</li>
                <li class="row-item">Privacy Policy</li>
                <li class="row-item">Terms & Conditions</li>
                <li class="row-item">Career</li>
            </ul>
        </div>

        <div class="copyright">
            <p> HCAS Library Copyright © 2024  - All rights reserved || Designed By: Tran Quy Anh</p>
        </div>
    </div>
</template>

<style scoped>
.footer {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: var(--black);
    margin-top: 10px;
    padding: 30px 0px;
    font-family: 'Play', sans-serif;
    text-align: center;
    height: 320px;
    background: #000;
    width: 100%;
}

.footer .icon{
    display: flex;
    justify-content: center;
}

.footer .icon .icon-item{
    color: var(--white);
    font-size: 30px;
    padding: 20px;
}

.icon .icon-item:hover{
    cursor: pointer;
}

.footer .row .row-item {
    color: var(--white);
}

.footer .row .row-item:hover {
    cursor: pointer;
}

.footer .row ul {
    width: 100%;
}

.footer .row ul li {
    display: inline-block;
    margin: 0px 30px;
}

.footer .copyright{
    color: var(--black-hover);
}
</style>