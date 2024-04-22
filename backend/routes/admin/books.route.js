const express = require('express')

const router = express.Router()

const booksController = require('../../controllers/admin/books.controller')

router.post('/',booksController.create)
router.get('/',booksController.findAll)
router.get('/:id',booksController.find)
router.put('/:id',booksController.update)
router.delete('/', booksController.deleteAll)
router.delete('/:id', booksController.delete)

module.exports = router;