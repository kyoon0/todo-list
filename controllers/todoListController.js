const Item = require('../models/todoListModel');
const todoListController = {};

// @desc Get To Do
// @route GET /api/todo
// @access Public
todoListController.getTodo = async (req, res) => {
	try {
		const response = await Item.find();
		return res.status(200).json(response);
	} catch (error) {
		res.locals.error = error;
		console.log(`Error in getTodo: ${error}`);
		return res.sendStatus(400);
	}
};

// @desc Create To Do
// @route POST /api/todo
// @access Public
todoListController.createTodo = async (req, res) => {
	try {
		// const { item } = req.body;
		const response = await Item.create({ item: req.body.item });
		res.locals.newTodo = response;
		return res.status(200).json(response);
	} catch (error) {
		res.locals.error = error;
		console.log(`Error in createTodo: ${error}`);
		return res.sendStatus(400);
	}
};

// @desc Delete To Do
// @route DELETE /api/todo
// @access Public
todoListController.deleteTodo = async (req, res) => {
	try {
		const response = await Item.deleteOne({ _id: req.params.id });
		return res.status(200).json({ id: req.params.id });
	} catch (error) {
		res.locals.error = error;
		console.log(`Error in deleteTodo: ${error}`);
		return res.sendStatus(400);
	}
};
// @desc Update To Do
// @route PUT /api/todo
// @access Public
todoListController.updateTodo = async (req, res) => {
	try {
		const response = await Item.findByIdAndUpdate(req.params.id, { item: req.body.item }, { new: true });
		// const response = await Item.updateOne({ item: req.params.item }, { item: req.body.item });
		return res.status(200).json(response);
	} catch (error) {
		res.locals.error = error;
		console.log(`Error in updateTodo: ${error}`);
		return res.sendStatus(400);
	}
};

module.exports = todoListController;
