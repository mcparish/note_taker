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
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    console.log("reading notes");
    console.log(notes);
    const note = {
        id: notes.length + 1,
        title: req.body.title,
        text: req.body.text
    };
    notes.push(note);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(note);
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
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    const note = notes.find(note => note.id === parseInt(req.params.id));
    if (note == null) {
        return res.status(404).json({ message: 'Cannot find note' });
    }
    const index = notes.indexOf(note);
    notes.splice(index, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json({ message: 'Note deleted' });
});

module.exports = router;