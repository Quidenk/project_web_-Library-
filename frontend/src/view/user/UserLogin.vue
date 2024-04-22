
<template>
    <div class="login_page">
        <div class="container">
            <div class="login">Login</div>
            <form @submit.prevent="login" class="form">
                <div class="mb-3 input">
                    <label for="username" class="label">Username : </label>
                    <input v-model="formData.username" type="text" class="form-control" id="username" placeholder="username">
                </div>

                <div class="mb-3 input">
                    <label for="password" class="label">Password : </label>
                    <input v-model="formData.password" type="password" class="form-control" id="password" placeholder="password">
                </div>

                
                <button type="submit" class="btn btn-primary btn-login">Login</button>
                <div class="register">
                    You don't have account?
                    <router-link to="/register">Register</router-link>
                </div>
                
            </form>
        </div>
    </div>
</template>

<script>
import authService from '../../services/user.service';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    data() {
        return {
            formData: {
                username: '',
                password: '',
            },
        };
    },
    methods: {
        async login() {
            try {
                const response = await authService.login(this.formData)
                console.log(response)
                toast.success('Login successfully.', {
                    autoClose: 800,
                })
                setTimeout(() => {
                    this.$router.push({name: 'home'})
                }, 1500);
            } catch (err) {
                console.log(err)
                toast.error('Username or password is incorrect', {
                    autoClose: 800,
                })
            }

        },
    },
};
</script>

<style scoped>
.login_page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* background: url("../../public/image/background_login.jpg") no-repeat center; */
    background-size: cover;
}

.container {
    width: 32%;
    border-radius: 5px;
    background: #2c2c2c;
    color: aliceblue;
    padding: 20px;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1), 0 6px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px solid #000;
}

.login {
    text-align: center;
    font-size: 35px;
}

.register,
.btn-login{
    display: flex;
    justify-content: center;
    margin: auto;
    color: aliceblue;
}

.btn-login {
    background: white;
    color: #000;
    border: none;
    width: 20%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.input {
    width: 95%;
}

</style>

