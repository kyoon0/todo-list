const express = require('express');
const router = express.Router();
const todoListController = require('../controllers/todoListController');

router.get('/', todoListController.getTodo);

router.post('/', todoListController.createTodo);

router.delete('/:id', todoListController.deleteTodo);

router.put('/:id', todoListController.updateTodo);

module.exports = router;
