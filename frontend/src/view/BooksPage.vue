<template>
    <div class="book">
        <div class="box">
            <Searching class="search" @search="performSearch"/>
            <div v-if="error">{{ error }}</div>
            <div v-if="loading">
                <i class="fa-solid fa-spinner fa-spin-pulse"></i>
            </div>
            <p v-else-if="books == ''">There are currently no books added to the store</p>
            <p v-else-if="filteredBooks.length === 0">No suitable books were found</p>
            <div class="book-area">
                <book-list :books="filteredBooks"/>
            </div>
        </div>
    </div>
</template>

<script>
import BookList from '../components/BooksList.vue';
import Searching from '../components/Searching.vue';
import BookService from "../services/book.service";

export default {
    components: { 
        Searching,
        BookList,
    },
    data() {
        return {
            books: [], // The complete list of products
            searchText: '', // The search input text
            loading: false,
            error: null,
        };
    },
    created() {
        this.retrieveBook(); // Fetch data when the component is created
    },
    methods: {
        performSearch(searchText) {
            this.searchText = searchText;
        },

        async retrieveBook() {
            try {
                this.loading = true;
                this.books = await BookService.getAll();
            } catch (error) {
                console.error(error);
                this.error = 'An error occurred while fetching books.';
            } finally {
                this.loading = false;
            }
        },

        normalizeText(text) {
            return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        },
    },
    computed: {
        filteredBooks() {
            const searchLower = this.normalizeText(this.searchText).toLowerCase();
            return this.books.filter(book => {
                const bookNameLower = this.normalizeText(book.bookname).toLowerCase();
                return bookNameLower.includes(searchLower);
            });
        },
    },
};
</script>

<style scoped>
    .book{
        text-align: center;
        background-color: var(--white);
        height: 140vh;
    }

    .search {
        margin-top: 20px;
    }

    .book-area{
        /* display: flex;
        justify-content: center; */
        width: 100%;
        height: 125vh;
        background-color: var(--white);
        margin-bottom: 70px;
        margin-top: 70px;
    }

    .box {
        margin-top: 20px;
        width: 100%;
    }

    .fa-spinner{
        font-size: 40px;
    }
</style>
