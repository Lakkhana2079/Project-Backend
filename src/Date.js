const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const db = new sqlite3.Database('./Database/Date.sqlite');

app.use(express.json());

db.run(`CREATE TABLE IF NOT EXISTS Dates (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT
)`);

app.get('/Dates', (req, res) => {
    db.all('SELECT * FROM Dates', (err, rows) => {
        if(err) {
            res.status(500).send(err);   
        }
        else{
            res.json(rows);
        }
    });
});

app.get('/Dates/:id', (req, res) => {
    db.get('SELECT * FROM Dates WHERE id = ?', req.params.id, (err, rows) => {
        if(err) {
            res.status(500).send(err);   
        } else {
            if (!row) {
                res.status(404).send('Date not found');
            }
            else {
                res.json(row)
            }
        }
    });
});

app.post('/Dates', (req, res) => {
    const Date = req.body;
    db.run('INSERT INTO Dates (title, author) VALUES (?, ?)', Date.title, Date.author, function(err) {
    if (err) {
        res.status(500).send(err);
    } else {
        Date.id = this.lastID;
        res.send(Date); 
    }
    });   
});

app.put('/Dates/:id', (req, res) => {
    const Date = req.body;
    db.run('UPDATE Dates SET title = ?, author = ? WHERE id = ?', Date.title, Date.author, req.params.id, function(err) {
    if (err) {
        res.status(500).send(err);
    } else {
        res.send(Date); 
    }
    });   
});

app.delete('/Dates/:id', (req, res) => {
    db.run('DELETE FROM Dates WHERE id = ?', req.params.id, function(err) {
    if (err) {
        res.status(500).send(err);
    } else {
        res.send({}); 
    }
    });   
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
