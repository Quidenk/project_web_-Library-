<template>
    <nav class="nav row" :class="{ 'transparent-header': isHomePage, 'normal-header': !isHomePage }">
        <div class="nav-bar-left">
            <router-link to="/" class="logo">HCAS</router-link>
            <router-link to="/" class="item">Home</router-link>
            <router-link to="/bookpage" class="item">Book</router-link>
        </div>

        <div class="nav-bar-right">
            <router-link to="/" class="favorite">
                <i class="fa-solid fa-heart item"></i>
            </router-link>

            <router-link to="/" class="cart">
                <i class="fa-solid fa-cart-shopping item"></i>
            </router-link>

            
            <router-link to="/manage" class="admin">
                <i class="fa-solid fa-screwdriver-wrench"></i>
            </router-link>   
            
            

            <template v-if="!isLoggedIn">
                <router-link to="/login" class="login item">Login</router-link>
            </template>
            <template v-else>
                <div class="profile item" @click="togglePopover">
                    <i class="fa-solid fa-circle-user"></i>
                </div>
            </template>
        </div>

        <user-popover
                v-if="isUserPopoverVisible"
                :show-popover="isUserPopoverVisible"
                :current-user="currentUser"
                @logout="logout"
                @mouseleave="closePopover"
            />
    </nav>
</template>

<script>
import UserPopover from '../components/user/PopupUser.vue';

export default {
    components: {
        UserPopover
    },

    props: {
        isHomePage: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            isUserPopoverVisible: false,
            checkadmin: false,
        }
    },

    computed: {
        isLoggedIn() {
            return localStorage.getItem('user');
        },
        currentUser() {
            return JSON.parse(localStorage.getItem('user'));
        },
        // adminAccount() {
        //     const user = JSON.parse(localStorage.getItem('user'));
        //     if ( user.position )
        //         checkadmin = true;
        //     else 
        //         checkadmin = false;
        // }
    },

    methods: {
        // checkAdmin() {
        //     return checkadmin = JSON.parse(localStorage.getItem('user')).position;
        // },

        togglePopover() {
            this.isUserPopoverVisible = !this.isUserPopoverVisible;
        },

        logout() {
            // Clear local storage when logging out
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.isUserPopoverVisible = false;
            // Redirect to the home page or any desired route after logout
            location.reload();
        },

        closePopover() {
      // Close the popover
            this.isUserPopoverVisible = !this.isUserPopoverVisible;
        },
    },
}

</script>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-content: center;
        /* background-color: transparent; */
        height: 70px;
        position: sticky;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 1001;
        background: #000;
    }

    .logo {
        margin: 5px;
        font-size: 26px;
        font-weight: 600;
        color: #fff;
        text-decoration: none;
    }

    .item {
        margin: 10px;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        text-decoration: none;
    }

    .item:hover {
        color: var(--black-hover);
        cursor: pointer;
    }

    .nav-bar-left {
        margin: 10px;
        font-size: 24px;
        font-weight: 600;
    }

    .nav-bar-right {
        display: flex;
        margin-right: 10px;
    }

    .favorite,
    .admin,
    .cart,
    .profile,
    .login {
        margin: 10px;
        font-size: 24px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        text-decoration: none;
    }

    .transparent-header {
        background-color: transparent;
    }

    .normal-header {
        display: flex;
        justify-content: space-between;
        align-content: center;
        width: 100%;
        height: 70px;
    }
</style>