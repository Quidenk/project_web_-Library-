<template>
    <div class="book-list">
        <div class="category">List Book</div>
        <div class="book-list__category">
            <div class="container">
                <div v-for="book in books" :key="book._id" class="box">
                    <div class="card" style="width: 18rem;">
                        <!-- <img src="..." class="card-img-top" alt="..."> -->
                        <div class="card-img">
                            <div class="img">thumnail</div>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{ book.bookname }}</h5>
                            <p class="card-text">{{ description(book._id) }}</p>
                            <button  @click="selectBook(book._id)" class="btn-details">Book Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <nav aria-label="Page navigation example" class="navigation">
                <ul class="pagination">
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                </ul>
            </nav>
            <span style="color: white; margin-top: -5px;">(Comming Soon...)</span>

        <div v-if="selectedBookId" class="book-details-popup">
            <div class="popup-content">
                <div>
                    <h3>Book Details</h3>
                    <div class="card-img">
                        <div class="img">thumnail</div>
                    </div>
                    <p>Book name: {{ getBookDetails(selectedBookId).bookname }}</p>
                    <p>Author: {{ getBookDetails(selectedBookId).author }}</p>
                    <p>Publisher: {{ getBookDetails(selectedBookId).publisher }}</p>
                    <p>Description: {{ getBookDetails(selectedBookId).description }}</p>
                    <p>Status: {{ getBookDetails(selectedBookId).quantily == 0 ? 'run out' : 'Inventory' }}</p>

                    <div class="btn">
                        <button class="favorite" @click="addFav(selectedBookId)"><i class="fa-solid fa-heart item"></i></button>
                        <button class="cart" @click="addBorrow(selectedBookId)"><i class="fa-solid fa-cart-shopping item"></i></button>
                    </div>
                </div>
                    <!-- Add more details as needed -->
                <button class="btn-popup" @click="closePopup"><i class="fa-solid fa-close"></i></button>

            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service'
export default {
    props: {
        books: Array, 
    },

    data(){
        return {
            // quantity: 1,
            selectedBookId: null,
        }
    },

    methods: {
        retrieveBook(bookId) {
            return this.books.find(book => book._id === bookId) || {};
        },

        description(bookId) {
            const maxLength = 100;
            const desc = this.retrieveBook(bookId).description
            if ( desc.length > maxLength ) {
                return desc.substring(0, maxLength) + "...";
            } else {
                return desc;
            }
        },

        selectBook(bookId) {
            this.selectedBookId = bookId;
            console.log(this.selectedBookId)
        },

        closePopup() {
            this.selectedBookId = null;
        },

        getBookDetails(bookId) {
            return this.books.find(book => book._id === bookId) || {};
        },

        async addBorrow(Id) {
            // Toggle the favorite status
            try {
                const user = localStorage.getItem('user');
                if (user) {
                    const userData = JSON.parse(user);

                    // Find the index of the product in the cart
                    const index = userData.borrow.findIndex(book => book.bookId === Id);

                    if (index !== -1) {
                        // If the product is already in the cart, increase the quantity
                        alert('You\'ve already borrowed this book');
                    } else {
                        // If the product is not in the cart, add it with the given quantity
                        userData.borrow.push({ bookId: Id, quantily: 1, status: 'not yet'});
                    }

                    // Update the user's cart
                    // You need an appropriate API endpoint to handle this update
                    const res = await UserService.updateBorrow(userData._id, userData.borrow);

                    // Update the local storage
                    localStorage.setItem('user', JSON.stringify(userData));

                    // Display a confirmation message
                    // toast.success('Book added to borrow', {
                    //     autoClose: 500
                    // });
                    setTimeout(() => {
                        this.$router.go();
                    }, 0);
                }else {
                    alert("You have to login!")
                    this.$router.push({name: 'login'})
                }
            } catch (error) {
                console.log(error);
            }
        },
    }
};
</script>

<style scoped>
.book-list{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px solid #000;
    border-radius: 10px;
    background: #000;
    border-radius: 20px;
    box-shadow: 5px 5px 5px #3f3e3e;
}
.category {
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: var(--color-bg);
    border-radius: 10px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-weight: 500;
    font-size: 25px;
    width: 90%;
    color: white;
    font-size: 35px;
}

.book-list__category {
    display: flex;
    justify-items: center;
    align-items: center;
    background-color: var(--color-bg);
    border-radius: 10px;
    /* margin: 20px 95px;
    padding: 10px;
    width: 90%; */
    width: 100%;
}

.container {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 100%;

}

.box {
    margin-right: 20px;
    margin-bottom: 20px;
}

.card {
    width: 300px;
    height: 400px;
    box-shadow: 0 0 1px rgba(255, 253, 253, 0.5), 0 0 2px rgba(255, 253, 253, 0.5), 0 0 3px rgba(255, 253, 253, 0.5), 0 0 4px rgba(255, 253, 253, 0.5), 0 0 5px rgba(255, 253, 253, 0.5), 0 0 6px rgba(255, 253, 253, 0.5), 0 0 7px rgba(255, 253, 253, 0.5);
    border-radius: 10px;
}

.card-img {
    display: flex;
    justify-content: center;
    align-items: center;
}

.img {
    margin-top: 10px;
    width: 90px;
    height: 120px;
    border: 2px solid black;
    border-radius: 8px;
}

.book-details-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .popup-content {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        width: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .btn-popup{
        background-color: transparent;
        height: 40px;
        width: 40px;
        font-size: 20px;
        border-radius: 10px;
        position: absolute;
        right: 27%;
    }

    .btn-details {
        background: #000;
        color: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        position: absolute;
        bottom: 20px;
        right: 95px;
        align-items: center;
    }

    .navigation {
        display: flex;
        justify-content: center;
    }

    .navigation span{
        color: white;
    }

    .favorite,
    .cart {
        margin: 10px;
        font-size: 24px;
        font-weight: 600;
        color: #000;
        cursor: pointer;
        text-decoration: none;
        border-radius: 30%;
        background: #000;
    }
</style>