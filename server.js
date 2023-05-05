const express = require('express');
const app = express();
const mongoose = require('mongoose');
const todoRouter = require('./routes/todoRoutes');
const userRouter = require('./routes/userRoutes');

// Connect to mongo db
mongoose.connect('mongodb+srv://kevinyoon01:bMAeRnFLSgq4kyGA@todolist.bkue7mh.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
	console.log('Connected to Database');
});
// JSON from incoming request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('./client/src'));

// Use url http://localhost:3000/
app.use('/api/todo', todoRouter);
app.use('/api/users', userRouter);

// app.get('/', (req, res) => {
// 	res.status(200).send('Hello World');
// });

//Global error handler
app.use((err, req, res, next) => {
	console.log(`global error now ${err}`);
	res.status(500).send({ error: err });
});

app.listen(3000, () => console.log('Server Up and running'));

module.exports = app;
