require('dotenv').config();

const express = require('express');
const cors = require("cors");

// const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();
//Enable cors
app.use(cors());
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
// app.use(bodyParser.json());

// JWT Secret Key
const JWT_SECRET = 'your_secret_key';

// Database connection
const db = mysql.createConnection({
	host: process.env.db_host,
	user: process.env.db_user,
	password: process.env.db_pswd,
	port: process.env.db_port,
	database: process.env.db_name
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

// --- Middleware for Authentication ---

// Verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    });
};

// --- Users Endpoints ---

// Register a new user with password hashing and input validation
app.post(
    '/users/register',
    [
        body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { username, email, password } = req.body;

        try {
            const passwordHash = await bcrypt.hash(password, 10);
            const query = 'INSERT INTO Users (Username, Email, PasswordHash) VALUES (?, ?, ?)';
            db.query(query, [username, email, passwordHash], (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                console.log(result)
                const token = jwt.sign({ userId:  result.insertId, username:username }, JWT_SECRET, { expiresIn: '1h' })
                res.status(201).json({ message: 'User registered successfully', userId: result.insertId, token : token });
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

// Login endpoint with JWT generation
app.post('/users/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM Users WHERE Email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.PasswordHash);

        if (!passwordMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.UserID, username: user.Username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, message: 'Login successful' });
    });
});

// Get user profile (protected route)
app.get('/users/profile', authenticateToken, (req, res) => {
    const query = 'SELECT UserID, Username, Email, CreatedAt, LastLogin, IsActive FROM Users WHERE UserID = ?';
    db.query(query, [req.user.userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(result[0]);
    });
});

// --- Membership Endpoints ---

// Create a membership activation record (protected route)
app.post('/membership', authenticateToken, (req, res) => {
    const { activationToken, tokenExpiry } = req.body;
    const userId = req.user.userId;

    const query = `
        INSERT INTO Membership (UserID, ActivationToken, TokenExpiry) 
        VALUES (?, ?, ?)
    `;
    db.query(query, [userId, activationToken, tokenExpiry], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Membership created', membershipId: result.insertId });
    });
});

// Activate membership
app.put('/membership/activate/:token', (req, res) => {
    const { token } = req.params;
    const query = `
        UPDATE Membership 
        SET IsActivated = TRUE, ActivatedAt = NOW() 
        WHERE ActivationToken = ? AND TokenExpiry > NOW() AND IsActivated = FALSE
    `;

    db.query(query, [token], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(400).json({ message: 'Invalid or expired token' });
        res.json({ message: 'Membership activated' });
    });
});

// --- Start the server ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
