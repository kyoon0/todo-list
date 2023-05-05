const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoListSchema = new Schema({
	item: { type: String, required: true },
});

module.exports = mongoose.model('Item', todoListSchema);
