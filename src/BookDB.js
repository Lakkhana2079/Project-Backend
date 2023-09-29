const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const db = new sqlite3.Database('./Database/BookDB.sqlite');

app.use(express.json());

db.run(`CREATE TABLE IF NOT EXISTS BookDBs (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT
)`);

app.get('/BookDBs', (req, res) => {
    db.all('SELECT * FROM BookDBs', (err, rows) => {
        if(err) {
            res.status(500).send(err);   
        }
        else{
            res.json(rows);
        }
    });
});

app.get('/BookDBs/:id', (req, res) => {
    db.get('SELECT * FROM BookDBs WHERE id = ?', req.params.id, (err, rows) => {
        if(err) {
            res.status(500).send(err);   
        } else {
            if (!row) {
                res.status(404).send('Book not found');
            }
            else {
                res.json(row)
            }
        }
    });
});

app.post('/BookDBs', (req, res) => {
    const BookDB = req.body;
    db.run('INSERT INTO BookDBs (title, author) VALUES (?, ?)', BookDB.title, BookDB.author, function(err) {
    if (err) {
        res.status(500).send(err);
    } else {
        BookDB.id = this.lastID;
        res.send(BookDB); 
    }
    });   
});

app.put('/BookDBs/:id', (req, res) => {
    const BookDB = req.body;
    db.run('UPDATE BookDBs SET title = ?, author = ? WHERE id = ?', BookDB.title, BookDB.author, req.params.id, function(err) {
    if (err) {
        res.status(500).send(err);
    } else {
        res.send(BookDB); 
    }
    });   
});

app.delete('/BookDBs/:id', (req, res) => {
    db.run('DELETE FROM BookDBs WHERE id = ?', req.params.id, function(err) {
    if (err) {
        res.status(500).send(err);
    } else {
        res.send({}); 
    }
    });   
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
