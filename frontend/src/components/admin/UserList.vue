<template>
    <div class="user-list__admin">
        <h4>Danh sách người dùng</h4>
        <div class="row">
            <div class="col-4">
                <ul class="list-group">
                    <li
                        class="list-group-item"
                        v-for="user in users" 
                        :key="user._id"
                        @click="selectUser(user._id)"
                    >
                    {{ user.fullname }}
                    </li>
                </ul></div>
            <div class="col-6">
                <div v-if="selectedUserId" class="card" style="width: 18rem;">
                    <div class="img-3x4"> img 3x4 </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ getUserDetails(selectedUserId).fullname }}</h5>
                        <p class="card-text"></p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Email: {{ getUserDetails(selectedUserId).email }}</li>
                        <li class="list-group-item">Phone: {{ getUserDetails(selectedUserId).phone }}</li>
                        <li class="list-group-item">Address: {{ getUserDetails(selectedUserId).address }}</li>
                        <li class="list-group-item">Gender: {{ getUserDetails(selectedUserId).gender ? 'nữ' : 'nam'}}</li>
                    </ul>
                    <div class="card-body">
                        <button type="button" class="btn btn-outline-success" >Success</button>
                        <button type="button" class="btn btn-outline-danger" @click="deleteUser(selectedUserId, `${ getUserDetails(selectedUserId).fullname }`)">Delete</button>
                    </div>
                </div>
            </div>

            <div class="col-2">Coming soon</div>
        </div>   
    </div>
</template>

<script>
import UserService from '../../services/user.service';
export default {
    props: {
        users: Array,
    },

    data() {
        return {
            selectedUserId: null,
        };
    },
    methods: {
        selectUser(userId) {
            this.selectedUserId = userId;
        },

        getUserDetails(userId) {
            // Assuming there is a method to get user details by ID
            return this.users.find(user => user._id === userId) || {};
        },

        async deleteUser(userId, userTitle) {
            if (confirm(`Do you want to remove this product ${userTitle}?`)) {
                try {
                    const response = await UserService.delete(userId)
                    this.users = this.users.filter((user) => user._id !== userId);
                    // this.updateUserCart(productId);
                } catch (error) {
                    console.log(error)
                }
                this.$router.go() 
            }
        },
    },
}
</script>

<style scoped>
    .user-list__admin{
        width: 100%;
    }

    h4{
        font-size: 50px;
        font-weight: bolder;
        margin: 50px 0px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    

    .col-4{
        left: -150px;
    }

    .col-6{
        margin-left: -100px;
    }

    .list-group{
        width: 100%;
    }

    .col-4 .list-group{
        overflow-y: scroll;
        max-height: 400px;
    }

    .list-group-item{
        width: 100%;
        height: 70px;
        font-size: 20px;
        /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1); */
        /* border-radius: 8px; */
    }

    .img-3x4{
        background: #3e3e3e;
        width: 120px;
        height: 160px;
        border-radius: 3px;
        margin: auto;
        color:#fff;
        text-align: center;
        align-content: center;
    }

    .btn{
        margin-right: 5px;
    }

    .card{
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 8px;    
    }
</style>