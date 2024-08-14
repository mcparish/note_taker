// GET all notes
const router = require('express').Router();
const fs = require('fs');
router.get('/', async (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    console.log("reading notes");
    console.log(notes);
    res.json(notes);
});

// GET a single note
router.get('/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.send(notes);
});

// POST a new note
router.post('/', async (req, res) => {
    const note = new Note({ title: req.body.title, content: req.body.content });
    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a note
router.patch('/:id', async (req, res) => {
    if (req.body.title != null) {
        res.note.title = req.body.title;
    }
    if (req.body.content != null) {
        res.note.content = req.body.content;
    }
    try {
        const updatedNote = await res.note.save();
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a note
router.delete('/:id', async (req, res) => {
    try {
        await res.note.remove();
        res.json({ message: 'Note deleted.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;