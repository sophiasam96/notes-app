const db = require('../models/noteModels');

const noteController = {

  async getAllNotes (req, res, next) {
    try {
      const notesQuery = 'SELECT * FROM notes';
      const result = await db.query(notesQuery)
      res.locals.getAllNotes = result.rows;
      return next();
    } catch (err) {
      console.error(err.message)
    }
  },

  async getNote (req, res, next) {
    try {
      const { id } = req.params;
      const noteQuery = 'SELECT * FROM notes WHERE note_id = $1';
      const result = await db.query(noteQuery, [id]);
      res.locals.getNote = result.rows;
      return next();
    } catch (err) {
      console.err(err.message);
    } 
  },
  
  async newNote (req, res, next) {
    try {
      const {note} = req.body;
      // const {date} = new Date;
      const notesQuery = 'INSERT INTO notes (note) VALUES ($1) RETURNING *'
      const result = await db.query(notesQuery, [note]); 
      // const addDate = await db.query(dateQuery);
      res.locals.newNote = result.rows;
      return next(); 
    } catch (err) {
      console.error(err.message);
    }
    },

    async updateNote (req, res, next) {
      try {
        const { id } = req.params;
        const { note } = req.body;

        const notesQuery = 'UPDATE notes SET note = $1 WHERE note_id = $2';
        const result = await db.query(notesQuery, [note, id]); 
        return next();

      } catch (err) {
        console.error(err.message);
      }
    },

    async deleteNote (req, res, next) {
      try {
        const { id } = req.params;

        const notesQuery = 'DELETE FROM notes WHERE note_id = $1';
        const result = await db.query(notesQuery, [id]); 
        return next();

      } catch (err) {
        console.error(err.message);
      }
    },
  

};  

module.exports = noteController; 