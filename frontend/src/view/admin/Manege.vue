<template>
    <div class="admin-page">
        <div class="vertical-menu">
            <router-link to="/manage/user-management" class="menu-item">
                <i class="fa-solid fa-user"></i><br>
                Users
            </router-link>
            <router-link to="/manage/book-management" class="menu-item">
                <i class="fa-solid fa-box"></i><br>
                Books
            </router-link>
            <!-- <router-link to="/manage/overall" class="menu-item">
                <i class="fa-solid fa-chart-line"></i><br>
                Analytics
            </router-link>
            <router-link to="/manage/order" class="menu-item">
                <i class="fa-solid fa-dolly"></i><br>
                Order
            </router-link>
            <router-link to="/" class="menu-item">
                <i class="fa-solid fa-right-from-bracket"></i>
            </router-link> -->
        </div>
        <welcom-admin v-if="showWelcome"></welcom-admin>
        <router-view></router-view>
    </div>
</template>

<script>
import WelcomAdmin from '../../components/admin/WelcomeAdmin.vue';
export default {
    components: {
        WelcomAdmin
    },

    computed: {
        showWelcome() {
            const excludedRoutes = ['book-management',
                                'user-management', 'overall', 'order', 'add-product', 'product-form'];
            return !excludedRoutes.includes(this.$route.name);
        },
    }
};
</script>

<style scoped>
.admin-page{
    display: flex;
    width: 100%;
    height: auto;
    background-color: var(--white);
}
.vertical-menu {
    background-color: #000;
    width: 100px;
    height: 100vh;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.menu-item {
    display: block;
    color: #fff;
    text-decoration: none;
    margin-bottom: 90px;
    margin-top: 20px;
    padding: 5px 0;
    border-bottom: 1px solid #444;
    transition: background-color 0.3s;
}

.menu-item i{
    font-size: 25px;
}

.menu-item:hover {
    background-color: #444;
}
</style>
