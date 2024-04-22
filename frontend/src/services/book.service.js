import createApiClient from "./api.service";

class BooksService {
    BookService() {
      throw new Error('Method not implemented.');
    }
    constructor(baseUrl = "/api/admin/book-list") {
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
    
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new BooksService();