<template>
    <div class="add-product-page">
        <div class="container">
            <div class="add-new">Update Book</div>
            <div class="form">
                <form @submit.prevent="updateBook()">
                    <div class="form-item">
                        <label class="label" for="bookname">Book Name:</label><br />
                        <input class="input" type="text" id="bookname" placeholder="book's name" v-model="formData.bookname" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="author">Author</label><br />
                        <input class="input" type="text" id="author" placeholder="Artist" v-model="formData.author" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="publisher">Publisher</label><br />
                        <input class="input" type="text" id="publisher" placeholder="Publisher" v-model="formData.publisher" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="desc">Description</label><br />
                        <input class="input" type="text" id="desc" placeholder="Description" v-model="formData.description"/>
                    </div>

                    <div class="form-item">
                        <label class="label" for="quantily">Quantily</label><br />
                        <input class="input" type="text" id="quantily" placeholder="Quantily" v-model="formData.quantily" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="img">Image(coming soon)</label><br />
                        <input class="input" type="file" id="img" accept="image/jpg, image/png"  />
                        <div>
                            <!-- {{ getFileName(formData.image) }} -->
                            <div >{{ info }}</div>
                        </div>
                    </div>

                    <button type="submit" class="btn">Update</button>
                    <button @click="back()" class="btn">Back</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import BookService from '../../services/book.service';

export default {
    data() {
        return {
            info: "Image data is being updated",
            formData: {
                bookname: '',
                quantily: 0,
                thumnail: '',
                author: '',
                publisher: '',
                description: '',
            },
        };
    },
    mounted() {
        this.retrieve(this.$route.params.id);
    },

    methods: {
        async retrieve(bookId) {
                try {
                    const book = await BookService.get(bookId);
                    if (book) {
                        this.formData.bookname = book.bookname;
                        this.formData.author = book.author;
                        this.formData.publisher = book.publisher;
                        this.formData.quantily = book.quantily;
                        this.formData.description = book.description;
                    } else {
                        console.log("book not found");
                    }

                    console.log(book);
                } catch (error) {
                    console.log(error);
                }
        },

        // getFileName(file) {
        // // Extract and return only the file name
        //     return file instanceof File ? file.name : file;
        // },

        // handleFileUpload(event) {
        //     const file = event.target.files[0];
        //     this.formData.image = file;
        //     this.imageChanged = true;
        // },


        async updateBook() {
            try {
                if (!this.formData.bookname || !this.formData.author || !this.formData.publisher || !this.formData.quantily || !this.formData.description) {
                    toast.error('Please fill in all required fields.', { autoClose: 3000 });
                    return;
                }

                const formData = new FormData();
                formData.append('bookname', this.formData.bookname);
                formData.append('author', this.formData.author);
                formData.append('quantily', this.formData.quantily);
                formData.append('publisher', this.formData.publisher);
                const response = await BookService.update(this.$route.params.id, this.formData);
                console.log(response);
                alert("Book was updated");
                this.$router.push({ name: "book-management" });
            } catch (error) {
                console.log(error);
            }   
        },

        back() {
            this.$router.push({ name: "book-management"});
        },
    },
};   
</script>

<style scoped>
.add-product-page {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
}

.container {
    width: 80%;
    width: 60%;
    height: 750px;
    text-align: center;
    /* margin-top: 10px; */
    background-color: #313131;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #ccc;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.add-new {
    font-size: 30px;
    margin-top: 20px;
}

.form-item {
    text-align: left;
    padding: 10px
}

.label {
    font-weight: bold;
}

.input {
    width: 100%;
    /* height: 40px; */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.btn {
    margin-top: 10px;
    margin-right: 10px;
    padding: 10px 20px;
    width: 30%;
    background-color: var(--black);
    background: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn:hover {
    background-color: var(--black-hover);
    color: var(--white)
}
</style>
