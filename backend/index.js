// Requiring express in our server
const cors = require("cors");
const express = require('express');
const app = express();
//Enable cors
app.use(cors());
// API Endpoints
const todos = require('./db.json');
console.log(todos);

// TODOS
app.get('/todos', async (req,res) =>{
	res.json(todos)
})

app.post('/todos', async (req,res) =>{
	res.json(todos)
})


// Setting the server to listen at port 3000
app.listen(8080, function(req, res) {
	console.log("Server is running at port 3000");
});