const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// CORS ayarları
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

// Veritabanı bağlantısı
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
  const { title, price, quantity, currency } = req.body;

  if (!title || !price || !quantity || !currency) {
    return res.status(400).json({ error: 'Title, price, quantity, and currency are required' });
  }

  const query = 'INSERT INTO offers (title, price, quantity, currency) VALUES (?, ?, ?, ?)';

  connection.query(query, [title, price, quantity, currency], (err, results) => {
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
  const query = 'SELECT id, title, price, currency FROM offers';

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
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const query = 'INSERT INTO acquisition_items (name) VALUES (?)';

  connection.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error inserting acquisition item: ', err);
      return res.status(500).json({ error: 'Error adding item' });
    }

    res.status(201).json({ message: 'Item added successfully' });
  });
});

// Alım Kalemlerini Listeleme Endpointi
app.get('/acquisition-items', (req, res) => {
  const query = 'SELECT * FROM acquisition_items';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching acquisition items: ', err);
      return res.status(500).json({ error: 'Error fetching acquisition items' });
    }

    res.status(200).json(results);
  });
});

// Alım Kalemi Silme Endpointi
app.delete('/acquisition-items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Teklifleri sil
    const deleteOffersQuery = 'DELETE FROM offers WHERE acquisition_item_id = ?';
    await new Promise((resolve, reject) => {
      connection.query(deleteOffersQuery, [id], (err) => {
        if (err) {
          console.error('Error deleting offers: ', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Alım kalemini sil
    const deleteItemQuery = 'DELETE FROM acquisition_items WHERE id = ?';
    await new Promise((resolve, reject) => {
      connection.query(deleteItemQuery, [id], (err) => {
        if (err) {
          console.error('Error deleting acquisition item: ', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    res.status(200).json({ message: 'Acquisition item and related offers deleted successfully' });
  } catch (err) {
    console.error('Error deleting acquisition item and related offers: ', err);
    res.status(500).json({ error: 'Error deleting acquisition item and related offers' });
  }
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
