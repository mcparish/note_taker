const express = require('express');
const path = require('path');
const { clog } = require('../middleware/clog');
const api = require('./routes/');

const PORT = process.env.PORT || 3002;
const app = express();
app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));


// GET Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.listen(PORT, () =>
    console.log(`App listening on port ${PORT}!`));