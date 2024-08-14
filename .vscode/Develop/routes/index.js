const router = require('express').Router();
const notesRouter = require('./notes.js'); // Make sure to include the file extension

router.use('/notes', notesRouter);

module.exports = router;