import createApiClient from "./api.service";

class UsersServiceClient {
    constructor(baseUrl = "/api/admin/account-list") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        // return (await this.api.get("/")).data;
        try {
            const response = await this.api.get('/')
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async create(data) {
        return (await this.api.post("/", data)).data;
    }

    async deleteAll() {
        return (await this.api.delete("/")).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async updateBorrow(id, data) {
        return (await this.api.put(`/borrow/${id}`, { data })).data;
        // try {
        //     const response = await this.api.put(`/${id}`, { data });
        //     return response.data;
        // } catch (error) {
        //     console.log(error);
        // }
    }
    
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async login(checkuser) {
        try {
        const response = await this.api.post('/login',checkuser);
        const { token, user} = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return user;
        } catch (err) {
            throw err;
        }
    };

    async adminlogin(checkuser) {
        try {
        const response = await this.api.post('/adminlogin',checkuser);
        const { token, user} = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return user;
        } catch (err) {
            throw err;
        }
    };

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    getUser(){
        // Retrieve user data from local storage
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    };
}
export default new UsersServiceClient();