require('dotenv').config();
// Requiring express in our server
const cors = require("cors");
const express = require('express');
const app = express();
const port = process.env.port
//Enable cors
app.use(cors());
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
// API Endpoints
const mysql = require('mysql2');

// Items
app.get('/items', async (req,res) =>{
	const con = mysql.createConnection({
		host: process.env.db_host,
		user: process.env.db_user,
		password: process.env.db_pswd,
		port: process.env.db_port,
		database: process.env.db_name
	});
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		const sql = "SELECT * FROM Items LIMIT 10 OFFSET 0";
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Result: " + result);
			res.json(result)
		});
	});
})

app.post('/items', async (req,res) =>{
	const con = mysql.createConnection({
		host: process.env.db_host,
		user: process.env.db_user,
		password: process.env.db_pswd,
		port: process.env.db_port,
		database: process.env.db_name
	});
	console.log(req.body);
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		const sql = `INSERT INTO Items (title) VALUES ('${req.body.title}')`;
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Result: " , result);
			res.json(200)
		});
	});
})


app.put('/items/:id', async (req,res) =>{
	const con = mysql.createConnection({
		host: process.env.db_host,
		user: process.env.db_user,
		password: process.env.db_pswd,
		port: process.env.db_port,
		database: process.env.db_name
	});
	console.log(req.body, req.params.id);
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		const sql = `UPDATE Items SET isComplete = ${req.body.isComplete} WHERE id = ${req.params.id}`;
		console.log(sql);
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Result: " , result);
			res.json(result)
		});
	});
})

app.delete('/items/:id', async (req,res) =>{
	const con = mysql.createConnection({
		host: process.env.db_host,
		user: process.env.db_user,
		password: process.env.db_pswd,
		port: process.env.db_port,
		database: process.env.db_name
	});
	console.log(req.body);
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		const sql = `DELETE FROM Items WHERE id = ${req.params.id}`;
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Result: " , result);
			res.json(result)
		});
	});
})


// Setting the server to listen at port 3000
app.listen(port, function(req, res) {
	console.log(`Server is running at port ${port}`);
});