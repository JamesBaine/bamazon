var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});

connection.connect(function(err){
	if (err) throw err;
	console.log("Connection successful!");
	appStart();
});

var appStart = function(){
	inquirer.prompt([{
		name: "menu",
		type: "rawList",
		message: "What would you like to do? [Quit with Q]",
		choices:["view products", "view low inventory","add inventory","add product", "Q"]
	}]).then(function(answer){
		if(answer.menu.toUpperCase()=="Q"){
			process.exit();
		}
		switch(answer.menu){
		case "view products":
			viewProducts();
			break;
		case "view low inventory":
			lowInventory();
			break;
		case "add inventory":
			addInventory();
			break;
		case "add product":
			console.log("add new");
			break;
		}
	});
};

var viewProducts = function(){
	connection.query("SELECT * FROM products", function(err,res){
		for (var i = 0; i < res.length; i++){
			console.log(res[i].itemid + " || " + res[i].productname + " || " + res[i].department + " || " + res[i].price + " || " + res[i].stockquantity + "\n");
		}
		appStart(res);
	});
};

var lowInventory = function(){
	connection.query("SELECT * FROM products", function(err,res){
		for (var i = 0; i < res.length; i++){
			if( res[i].stockquantity <  5 ){
				console.log(res[i].itemid + " || " + res[i].productname + " || " + res[i].department + " || " +res[i].price + " || " +res[i].stockquantity + "\n");
			}
		}
		appStart(res);
	});
};

var addInventory = function(){
	connection.query("SELECT * FROM products", function(err,res){
		for (var i = 0; i < res.length; i++){
			console.log(res[i].itemid + " || " + res[i].productname + " || " + res[i].department + " || " +res[i].price + " || " +res[i].stockquantity + "\n");
		}
		inquirer.prompt([{
			type: "input",
			name: "choice",
			message: "Which items stock would you like to increase?[Quit with Q]"
		}]).then(function(answer){
			var correct = false;
			if(answer.choice.toUpperCase()=="Q"){
				process.exit();
			}
			for(var i = 0; i < res.length; i++){
				if(res[i].productname == answer.choice){
					correct = true;
					var product = answer.choice;
					var id = i;
					inquirer.prompt([{
						type: "input",
						name: "quant",
						message: "How many would like to add?",
						validate: function(value){
							if(isNaN(value) == false){
								return true;
							} else {
								return false;
							}
						}
					}]).then(function(answer){
						connection.query("UPDATE products SET stockquantity='"+(res[id].stockquantity + parseInt(answer.quant))+"' WHERE productname='"+product+"'", function(err,res2){
							console.log("Stock Updated!");
							viewProducts();
						});
					});
				}
			}
		});
	});
};
