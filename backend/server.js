const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// CORS ayarları
app.use(cors({
  origin: 'http://localhost:3000', // React uygulamanızın çalıştığı yer
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

// Veritabanı bağlantısı oluşturun
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'myuser',
  password: 'mypassword',
  database: 'mydatabase'
});

// Bağlantıyı başlat
connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Kayıt endpointi
app.post('/signup', async (req, res) => {
  const { fullName, lastName, email, phoneNumber, password } = req.body;

  if (!fullName || !lastName || !email || !phoneNumber || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (fullName, lastName, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?)';

    connection.query(query, [fullName, lastName, email, phoneNumber, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error inserting user: ', err);
        return res.status(500).json({ error: 'Error registering user' });
      }

      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (err) {
    console.error('Error hashing password: ', err);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Giriş endpointi
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';

  connection.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error checking user: ', err);
      return res.status(500).json({ error: 'Error logging in' });
    }

    if (results.length > 0) {
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// Teklif ekleme endpointi
app.post('/offers', (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ error: 'Title, description, and price are required' });
  }

  const query = 'INSERT INTO offers (title, description, price) VALUES (?, ?, ?)';

  connection.query(query, [title, description, price], (err, results) => {
    if (err) {
      console.error('Error inserting offer: ', err);
      return res.status(500).json({ error: 'Error creating offer' });
    }

    res.status(201).json({ message: 'Offer created successfully' });
  });
});

// Teklif detaylarını alma endpointi
app.get('/offers/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM offers WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching offer: ', err);
      return res.status(500).json({ error: 'Error fetching offer details' });
    }

    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ error: 'Offer not found' });
    }
  });
});

// Teklifleri listeleyen endpoint
app.get('/offers', (req, res) => {
  const query = 'SELECT * FROM offers';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching offers: ', err);
      return res.status(500).json({ error: 'Error fetching offers' });
    }

    res.status(200).json(results);
  });
});

// Alım Kalemi Ekleme Endpointi
app.post('/acquisition-items', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  const query = 'INSERT INTO acquisition_items (name, description) VALUES (?, ?)';

  connection.query(query, [name, description], (err, results) => {
    if (err) {
      console.error('Error inserting acquisition item: ', err);
      return res.status(500).json({ error: 'Error adding item' });
    }

    res.status(201).json({ message: 'Item added successfully' });
  });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
