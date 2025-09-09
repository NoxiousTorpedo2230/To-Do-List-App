const express = require('express');
const { userController, todoController } = require('../controller/controller');
const { auth } = require('../middleware/middleware');

const router = express.Router();

router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);

router.get('/todos', auth, todoController.getTodos);
router.get('/todos/:id', auth, todoController.getTodo);
router.post('/todos', auth, todoController.createTodo);
router.put('/todos/:id', auth, todoController.updateTodo);
router.delete('/todos/:id', auth, todoController.deleteTodo);

module.exports = router;