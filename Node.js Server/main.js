var http = require('http');
var fs = require('fs');
var mysql = require('mysql');
$ = require('jquery');
var Book = require('./datatypes');
var con = mysql.createConnection({
  host: "localhost",
  port:"3306",
  database:"librarydb",
  user: "root",
  password: "toor"
});
con.connect(function(err) {
  if (err) throw err;
});
con.query("select * from books", function(err,result){
  if(err) throw err;
  console.log(result[0].title);
  //process.exit();
});
console.log(data);
/**@param {Book}book*/
function createBook(author,title,pages,lang,ISBN,rack_no,copy_no,date_of_purchase,classification_no,edition_no) {
  
}
function addBookToDB(book){

}

