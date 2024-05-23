var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.set("view engine", "ejs");
var cors = require("cors");
app.use(cors());
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project"
});
conn.connect(function (err) {
    if (err)
        throw err;
    console.log("Connection successful");
});

var server = app.listen(4000, function () { console.log("app running on 4000"); });

app.get("/", function (req, res) {
    res.render("form");
});

//post:   insert data and use to get single row
//get:    get all rows or table
//delete: delete all rows or sepecific row
//put:    update any row

app.post("/insertreseller", function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var address = req.body.address;
    var phone = req.body.phone;



    var sql = `insert into reseller (name,email,password,address,phone) values ('${name}','${email}','${password}','${address}','${phone}')`;


    var data = [name, email, password, address, phone];
    conn.query(sql, function (err, results) {
        if (err)
            throw err;
        res.send(results);
    });
});

app.post("/insertsupplier", function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var address = req.body.address;
    var phone = req.body.phone;
    var sql = `insert into supplier (name,email,password,address,phone) values ('${name}','${email}','${password}','${address}','${phone}')`;


    var data = [name, email, password, address, phone];
    conn.query(sql, function (err, results) {
        if (err)
            throw err;
        res.send(results);
    });
});

app.post("/insertproduct", function (req, res) {

    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var image = req.body.image;

    var sql = `insert into product (title,description,price,image) values ('${title}','${description}','${price}','${image}'`;


    var data = [title, description, price, image];
    conn.query(sql, function (err, results) {
        if (err)
            throw err;
        res.send(results);
    });
});
app.get("/getdata", function (req, res) {
    var sql = `Select * from emp`;
    conn.query(sql, function (err, results) {
        if (err)
            throw err;
        console.log(results);
        res.send(results);
    });
});

app.get("/getblog", function (req, res) {
    var sql = `Select * from blog `;
    conn.query(sql, function (err, results) {
        if (err)
            throw err;
        console.log(results);
        res.send(results);
    });
});
app.post("/getsupplier", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var sql = `Select * from supplier where email = '${email}' AND password = '${password}'  `;
    conn.query(sql, function (err, results) {
        if (err)
            throw err;
        console.log(results);
        res.send(results);
    });
});
