<template>
    <div class="page">
        <div class="booklist-area">
            <book-list :books="books"></book-list>
        </div>
    </div>
</template>

<script>
import BookService from '../../services/book.service';
import BookList from './BookListAdmin.vue';

export default {
    components: { BookList },

    data() {
        return{
            books: []
        }
    },

    created() {
        this.retrieveBook();
    },

    methods: {
        async retrieveBook(){
            try {
                this.books = await BookService.getAll();
                console.log('Books retrieved:', this.books);
            } catch (error) {
                console.error('Error retrieving books:', error);
            }
        },
    },

    // computed: {
    //     filteredProducts() {
    //         return this.products;
    //     },
    // },
}
</script>


<style scoped>
    .page{
        width: 100%;
        height: auto;
    }

    /* .productlist-area{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    } */

</style>