
//connect to the database
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");
// readProducts();
// var items = [];


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
  console.log("Welcome to Bamazon \n");
  
  readProducts();
});


function readProducts() {
  // console.log("Show All Products...\n ");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.log(res);
    // for (var i = 0; i < res.length; i++){
    // }
      //using easy-table
    var data = [ //displays rows
        { 
          item_id: res[0].item_id, 
          product_name: res[0].product_name, 
          department_name: res[0].department_name, 
          price: res[0].price, 
          stocks_quantity: res[0].stocks_quantity, 
        }
      ]   

      for(var i = 1; i < res.length; i++ ) {

      data.push(
           { 
          item_id: res[i].item_id, 
          product_name: res[i].product_name, 
          department_name: res[i].department_name, 
          price: res[i].price, 
          stocks_quantity: res[i].stocks_quantity, 
           }
        );
    }
      var t = new Table
       
      data.forEach(function(res) {
         t.cell('item_id', res.item_id);
         t.cell('product_name', res.product_name);
         t.cell('department_name', res.department_name);
         t.cell('price, USD', res.price, Table.number(2));
         t.cell('stocks_quantity',res.stocks_quantity);
         t.newRow()
      })
       
      console.log(t.toString());

      inquirer.prompt([
          {
            type:'input',
            name:'itemID',
            message: 'What is the ID of the item you would like to buy [Quit with Q]  ? \n \n'        
          }
      ]).then (function (response) {
        // console.log(response.itemID);
        // console.log("Items " + itemID.itemID);
        updateProduct(response.itemID);
      })
  })

}

function updateProduct(itemID) {
     var itemIDChosen = parseInt(itemID) - 1;
     var stocksRemaining;
     // console.log("item ID Chosen " + itemIDChosen);
     connection.query("SELECT * FROM products", function(err, res) {
      
      stocksRemaining = parseInt(res[itemIDChosen].stocks_quantity);
         console.log("stocks remaining: " + stocksRemaining);
     })


    var queryString = "UPDATE products SET ? WHERE ?"
    inquirer.prompt([
        {
         type:'input',
         name:'purchaseOrder',
         message:'How many products you want to buy?' 
        }
    ]).then(function (quantity){
      // console.log("quantity " + quantity.purchaseOrder);
      

      var stocks_quantity = parseInt(stocksRemaining) - parseInt(quantity.purchaseOrder);
      
  if(stocks_quantity < 0) {
              console.log("Insufficient quantity!!");
              connection.end();
        
    } else {     

      // console.log("Stocks Quantity " + stocks_quantity);

      var values = [
        {
          stocks_quantity: stocks_quantity
        },
        {
          item_id: itemID
        }
      ];
      console.log(stocks_quantity + " stocks remain of item ID: " + itemID );
      var query = connection.query(queryString,values ,function(err,res) {
        
            if(stocks_quantity <= 0) {
            } else {

                // console.log(res);
                console.log(res.affectedRows + " product has been updated \n \n");
              // console.log(res);
              readProducts()
              console.log(query.sql);
            }
        });
  }   
    })
  
}  