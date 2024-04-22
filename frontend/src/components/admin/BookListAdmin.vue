<template>
    <div class="book-list__admin">
        <h4>Danh sách sách</h4>
        <div class="search-bar">
            <input v-model="searchText" @keydown.enter="performSearch" placeholder="Search books" />
            <button class="btn" @click="performSearch" type="submit">Search</button>
        </div>
    

        <div class="container shadow-lg rounded bg-body-tertiary">
            <div class="notify" v-if="filteredBooks.length === 0">No suitable products were found</div>
            <div v-for="book in filteredBooks" :key="book._id">
                <div class="book-item">
                    <div class="img">
                        <!-- <img :src="'http://localhost:3000/uploads/' + product.image" alt="Product Image" /> -->
                        <div class="img">thumnail</div>
                    </div>
                    <div class="item">{{ book.bookname }}</div>
                    <i class="fa-solid fa-pen btn" @click="editBook(book._id)"></i>
                    <i class="fa-solid fa-trash" @click="deleteBook(book._id, book.bookname)"></i>
                </div>
            </div>
        </div>

        <div class="add-book">
            Add new book
            <router-link :to="{ name: 'add-book' }"><button class="btn-add">
                <i class="fa-solid fa-plus"></i>
            </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import BookService from '../../services/book.service';
export default {
    props: {
        books: Array,
    },

    data() {
        return {
            searchText: '',
            filteredBooks: []
        }
    },

    watch: {
        books: {
            handler() {
                this.performSearch();
            },
            deep: true
        }
    },

    methods: {
        normalizeText(text) {

            return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        },

        editBook(bookID) {
            this.$router.push({ name: "book-form", params: { id: bookID } });
        },

        performSearch() {
            const searchLower = this.normalizeText(this.searchText).toLowerCase();
            this.filteredBooks = this.books.filter(book => {
                const bookTitleLower = this.normalizeText(book.bookname).toLowerCase();
                return bookTitleLower.includes(searchLower);
            });
        },

        async showConfirmationDialog(message) {
            return new Promise((resolve) => {
                const Confirmation = window.confirm(message);
                resolve(Confirmation);
            });
        },

        async deleteBook(bookId, bookname) {
            const Confirmation = await this.showConfirmationDialog(`Do you want to remove this product ${bookname}?`);
            if (Confirmation) {
                try {
                    const response = await BookService.delete(bookId)
                    console.log(response)
                    this.books = this.books.filter((book) => book._id !== bookId);
                    // this.updateUserCart(bookId);
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
    .book-list__admin {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 90vh;
    background-color: var(--white);
    }

    h4{
        font-size: 50px;
        font-weight: bolder;
        margin: 50px 0px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .search-bar {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        width: 100%;
    }

    input {
        padding: 8px;
        width: 40%;
        border: 1px solid var(--black);
        border-radius: 5px;
        background: #000;
        color: aliceblue;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }

    .img {
        background: white;
        text-align: center;
        align-content: center;
    }

    .btn {
        padding: 8px 16px;
        background-color: var(--black);
        color: var(--white);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        color: #000;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .btn:hover {
        background-color: var(--black-hover);
    }


    .notify {
        text-align: center;
    }

    .container {
        display: flex;
        width: 70%;
        flex-wrap: nowrap;
        flex-direction: column;
        margin-top: 20px;
        overflow-y: scroll;
        /* Add this line to enable vertical scrollbar */
        max-height: 600px;
        /* Set a maximum height for the container */
    }

    .add-book {
        margin-top: 20px;
        padding: 10px;
        border: 1px solid #000;
        border-radius: 10px;
        width: 20%;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .btn-add {
        background: transparent;
        width: 40px;
        border-radius: 5px;
    }

    .btn-add:hover {
        background: var(--black);
        color: var(--white);
    }

    .book-item {
        display: flex;
        justify-content: space-around;
        border: 2px solid var(--black);
        border-radius: 8px;
        align-items: center;
        padding: 10px;
        margin-bottom: 2px;
        background: #000;
    }

    .img {
        height: 90px;
        width: 90px;
    }

    .item {
        display: flex;
        /* justify-content: center; */
        font-size: 18px;
        margin: 15px;
        width: 300px;
    }

    .btn{
        margin-right: 10px;
    }

    .fa-pen,
    .fa-trash {
        border: 1px solid var(--black);
        padding: 10px;
        color: var(--white);
        background-color: var(--black);
        width: 80px;
        text-align: center;
        border-radius: 10px;
    }

    .fa-pen:hover,
    .fa-trash:hover {
        color: var(--black-hover);
        cursor: pointer;
    }

</style>