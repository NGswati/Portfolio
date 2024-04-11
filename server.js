const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'intro.html'));
});

app.get('/ht', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ht.html'));
});

// app.get('/school', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'school.js'));
// });

app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'app.js'));
});
app.get('/intro', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'intro.js'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
