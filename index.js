const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

//Config de conexão com o banco de dados
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Alberty12825580643",
  database: "segimob",
});

app.use(cors());
app.use(express.json());

//Função que registra dados no banco
app.post("/register", (req, res) => {
  const { origin } = req.body;
  const { destiny } = req.body;
  const { height } = req.body;
  const { width } = req.body;
  const { length } = req.body;
  const { typeTransp } = req.body;
  const { responsible } = req.body;
  const { dateOut } = req.body;
  const { totalPrice } = req.body;

  let SQL =
    "INSERT INTO orders (ORIGIN, DESTINY, HEIGHT, WIDTH, LENGTH, TYPETRANSP, RESPONSIBLE, DATEOUT, TOTALPRICE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";

  db.query(
    SQL,
    [
      origin,
      destiny,
      height,
      width,
      length,
      typeTransp,
      responsible,
      dateOut,
      totalPrice,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/getOrders", (req, res) => {
  let SQL = "SELECT * FROM orders;";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.put("/edit", (req, res) => {
  const { codOrder } = req.body;
  const { editStatus } = req.body;

  let SQL = "UPDATE orders SET STATUS = ? WHERE COD_ORDER = ?";

  db.query(SQL, [editStatus, codOrder], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let SQL = "DELETE FROM orders WHERE COD_ORDER = ?";

  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});


//porta em que esta sendo executado o node
app.listen(3001, () => {
  console.log("rodando servidor");
});
