LoginForm.vue
<template>
    <div class="register_page">
        <div class="container">
            <div class="register">Register</div>
            <form @submit.prevent="register" class="form">
                <div class="grid">
                <div class="mb-3 input">
                    <label for="fullname" class="label">Full name</label>
                    <input 
                        type="text" 
                        class="form-control input-error" 
                        id="fullname" 
                        placeholder="fullname"
                        :class="{ 'input-error': submitted && (!formData.fullname || fullnameError), 'input-success': submitted && !fullnameError }"
                        v-model="formData.fullname"
                        @input="validateFullname"
                        required>
                        <span class="error-message" v-if="submitted && !formData.fullname">full name is required</span>
                </div>

                <div class="mb-3 input">
                    <label for="username" class="label">Username</label>
                    <input 
                        type="text" 
                        class="form-control input-error" 
                        id="username" 
                        placeholder="username"
                        :class="{ 'input-error': submitted && (!formData.username || usernameError), 'input-success': submitted && !usernameError }"
                        v-model="formData.username"
                        @input="validateUsername"
                        required>
                    <span class="error-message" v-if="submitted && !formData.username">Username is required</span>
                    <span class="error-message" v-if="submitted && usernameError">{{ usernameError }}</span>
                </div>

                <div class="mb-3 input">
                    <label for="email" class="label">Email</label>
                    <input 
                        type="text" 
                        class="form-control input-error" 
                        id="email" 
                        placeholder="email"
                        :class="{ 'input-error': submitted && (!formData.email || emailError), 'input-success': submitted && !emailError }"
                        v-model="formData.email"
                        >
                    <span class="error-message" v-if="submitted && !formData.email">Email is required</span>
                    <span class="error-message" v-if="submitted && emailError">{{ emailError }}</span>
                </div>

                <div class="mb-3 input">
                    <label for="password" class="label">Password</label>
                    <input 
                        type="password" 
                        class="form-control input-error" 
                        id="password" 
                        placeholder="password"
                        :class="{ 'input-error': submitted && (!formData.password || passwordError), 'input-success': submitted && !passwordError }"
                        v-model="formData.password"
                        @input="validatePassword"
                        required>
                    <span class="error-message" v-if="submitted && !formData.password">Password is required</span>
                    <span class="error-message" v-if="submitted && passwordError">{{ passwordError }}</span>
                </div>

                <div class="mb-3 input">
                    <label for="address" class="label">Address</label>
                    <input 
                        type="text" 
                        class="form-control input-error" 
                        id="address" 
                        placeholder="address"
                        :class="{ 'input-error': submitted && (!formData.address || addressError), 'input-success': submitted && !addressError }"
                        v-model="formData.address">
                    <span class="error-message" v-if="submitted && !formData.address">Address is required</span>
                    <span class="error-message" v-if="submitted && addressError">{{ addressError }}</span>
                </div>

                <div class="mb-3 input">
                    <label for="password2" class="label">Password Confirm</label>
                    <input 
                        type="password" 
                        class="form-control input-error" 
                        id="password2" 
                        placeholder="password confirm"
                        :class="{ 'input-error': submitted && (!formData.password2 || password2Error), 'input-success': submitted && !password2Error }"
                        v-model="formData.password2"
                        @input="validateConfirmPassword"
                        required>
                    <span class="error-message" v-if="submitted && !formData.password2">Password Confirm is required</span>
                    <span class="error-message" v-if="submitted && password2Error">{{ password2Error }}</span>
                </div>
                </div>
                
                <div class="mb-3 input phone">
                    <label for="phone" class="label">Phone</label>
                    <input 
                        type="text" 
                        class="form-control input-error" 
                        id="phone" 
                        placeholder="phone"
                        :class="{ 'input-error': submitted && (!formData.phone || phoneError), 'input-success': submitted && !phoneError }"
                        v-model="formData.phone">
                    <span class="error-message" v-if="submitted && !formData.phone">Phone is required</span>
                    <span class="error-message" v-if="submitted && phoneError">{{ phoneError }}</span>
                </div>

                <button type="submit" class="btn btn-register">Register</button>

                <div class="login">
                        Bạn đã có tài khoản?
                        <router-link to="/login">Login now!</router-link>
                </div>                
            </form>
        </div>
    </div>
</template>

<script>
import UserService from '../../services/user.service';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    data() {
        return {
            formData: {
                username: '',
                password: '',
                password2: '',
                address: '',
                phone: 0,
                gender: true,
            },
            fullnameError: "",
            usernameError: "",
            emailError: "",
            passwordError: "",
            confirmPasswordError: "",
            submitted: false,
        };
    },
    methods: {
        validateUsername() {
            if (this.formData.username.length < 3) {
                this.usernameError = "Username must be at least 3 characters long";
            } else {
                this.usernameError = "";
            }
        },
        validateFullname() {
            if (this.formData.fullname.length < 5 && this.formData.fullname.length > 20) {
                this.fullnameError = "Fullname must be within 20 characters";
            } else {
                this.fullnameError = "";
            }
        },

        validatePassword() {
            if (this.formData.password.length < 8) {
                this.passwordError = "Password must be at least 8 characters long";
            } else {
                this.passwordError = "";
            }
        },

        validateConfirmPassword() {
            if (this.formData.password2 !== this.formData.password) {
                this.confirmPasswordError = "Passwords do not match";
            } else {
                this.confirmPasswordError = "";
            }
        },

        // validateRegister() {
            
        // }

        async register() {
            try {
                if (this.formData.password2 == this.formData.password) {
                    const res = await UserService.create(this.formData);
                    console.log(res);
                    toast.success('Registration successful', {
                        autoClose: 1500,
                    })
                    setTimeout(() => {
                        this.$router.push({ name: "login" });
                    }, 800);
                }else {
                    alert("Password Confirm incorrect");
                }
            } catch (error) {
                console.error("Registration failed:", error);
            }
        }
    },
};
</script>

<style scoped>
.register_page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* background: url("../../public/image/background_login.jpg") no-repeat center; */
    background-size: cover;
}

.container {
    width: 45%;
    border-radius: 5px;
    background: #2c2c2c;
    color: aliceblue;
    padding: 20px;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1), 0 6px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px solid #000;
}

.register {
    text-align: center;
    font-size: 35px;
    margin-bottom: 10px;
}

.login,
.btn-register{
    display: flex;
    justify-content: center;
    margin: auto;
    color: aliceblue;
}

.btn-register {
    margin-top: 20px;
    background: white;
    color: #000;
    border: none;
    width: 20%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.login {
    margin-top: 5px;
    font-size: 15px;
}

.grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.phone {
    margin-left: 15px;
}

.input {
    width: 45%;
    margin-right: 20px;
}

/* .input-error {
    border: 2px solid red;
    box-shadow: 0 0 10px red, 0 0 20px red, 0 0 30px red, 0 0 40px red, 0 0 50px red, 0 0 60px red, 0 0 70px red;
    animation: run 5s linear infinite;
} */



.input-success {
    border: 2px solid #00ff00; /* Mã màu xanh lá */
    box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00, 0 0 50px #00ff00, 0 0 60px #00ff00, 0 0 70px #00ff00;
}

.error-message {
    color: red;
    /* Set the text color to red */
    font-size: 14px;
    /* Define the font size */
    margin-top: 5px;
    /* Add some spacing to separate error messages */
    text-align: left;
    /* Align text to the left */
}

</style>

