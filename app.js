const express=require("express");
const bodyParser=require("body-parser");
const db=require("./db");

const app=express();
const PORT=8000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/students", (req, res) => {
  db.all("SELECT * FROM students", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.get("/student/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM students WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json(err);
    row ? res.json(row) : res.status(404).send("Not found");
  });
});

app.post("/students", (req, res) => {
  const { firstname, lastname, gender, age } = req.body;
  const query = `INSERT INTO students (firstname, lastname, gender, age) VALUES (?, ?, ?, ?)`;
  db.run(query, [firstname, lastname, gender, age], function (err) {
    if (err) return res.status(500).json(err);
    res.status(201).send(`Created with id ${this.lastID}`);
  });
});

app.put("/student/:id", (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, gender, age } = req.body;
  const query = `UPDATE students SET firstname=?, lastname=?, gender=?, age=? WHERE id=?`;
  db.run(query, [firstname, lastname, gender, age, id], function (err) {
    if (err) return res.status(500).json(err);
    res.send(`Updated student ${id}`);
  });
});

app.delete("/student/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM students WHERE id=?`, [id], function (err) {
    if (err) return res.status(500).json(err);
    res.send(`Deleted student ${id}`);
  });
});

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
