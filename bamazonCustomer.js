
//connect to the database
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Welcome to Bamazon");
 

  readProducts();
  // inquirer.prompt([

  //   ]);



});

function readProducts() {
  console.log("Show All Products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    products = res;
    filterProduct(products);
    console.log(res);
  connection.end();
  });
}

function updateProduct() {
    console.log("Update Quantity...\n");
    //
    var queryString = "UPDATE products SET ? WHERE ?";

    var values = [
      {
        stocks_quantity: 30
      },
      {
        item_id: 1
      }
    ]
    var query = connection.query(queryString,values,function(err,res) {
        console.log(res.affectedRows + "product has been updated");

      }
    );
  console.log(query.sql);
}  


function filterProduct(products){
    var productobjsArr = [];
    var table = new Table({
    head: ['position', 'product_name', 'department_name', 'category_name', 'price', 'stock_quantity'], 
    //colWidths: [100, 100, 100, 100, 100, 100]
    });
    products.forEach(function(productObj){
        var productArr = [];
        for (var key in productObj) {
            productArr.push(productObj[key]);
    }
    productobjsArr.push(productArr);
    });
    productobjsArr.forEach(function(produsts){
        console.log(produsts)
        table.push(produsts);
        console.log(table.toString());
    })
}