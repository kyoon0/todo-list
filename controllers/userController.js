const User = require('../models/userModel');
const userController = {};

userController.createUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const response = await User.create({ username: username, password: password });
		console.log(response);
		return res.status(200).json(response);
	} catch (error) {
		console.log(`Error in createUser: ${error}`);
		return res.sendStatus(400);
	}
};

userController.loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const response = await User.findOne({ username: username, password: password });
		console.log(response);
		return res.status(200).json(response);
	} catch (error) {
		console.log(`Error in loginUser: ${error}`);
		return res.sendStatus(400);
	}
};

module.exports = userController;
