var http = require('http');
var fs = require('fs');
var mysql = require('mysql');
$ = require('jquery');
var Book = require('./datatypes');
var parseCSV = require('csvparser');

var warnings = 0, errors = 0, good = 0;
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
var c = fs.readFile("books2.csv", getBooksFromCSV);



/**@param {Book}book*/
function getBooksFromCSV(err, data) {
    data = parseCSV("" + data);
    var head = data[0];
    data = data.slice(1,-1);
    console.log(head);
    
    var books = [];
    for(var row of data){
      var auth = row[1],
          title = row[0],
          pages = row[3],
          lang = (Math.random()<.5?"AR":"FR"),
          rack = 0,
          copy = 0,
          edi = Math.floor(3*Math.random()),
          date = randomDate(),
          pub = row[4],
          isbn = 0,
          clas = "";

        books.push(new Book(auth, title, pages, lang, rack, copy, clas, isbn, date, edi, pub))
    }
    fs.writeFile("exceptions.json", "", function(){});
    addBooksToDB(books);
}

function warn(count){
  warnings += warn;
}
function err(){
  errors++;
}
function succ(){
  good++;
}
/**
 * 
 * @param {Book[]} books 
 */
function addBooksToDB(books){
  console.log("generated");
  var i = 0;
  var buffer = 20;
  var query = `insert into books(title,author,classification_no,publisher,rack_no,copy_no,isbn, date_of_purchase, pages, lang)values`;
  while(i < books.length){
    for(let j = 0; j < buffer && i < books.length; j++){
      var book = books[i];
      book = fixBook(book, i);
      var errorstack = {};
      errorstack.arr = [];
      book.title = (""+book.title).replace(/"/g,"'");
      book.author = (""+book.author).replace(/"/g,"'");
      book.publisher = (""+book.publisher).replace(/"/g,"'");
      book.classification_no = (""+book.classification_no).replace(/"/g,"'");
      book.rack_no = (""+book.rack_no).replace(/"/g,"'");
      book.copy_no = (""+book.copy_no).replace(/"/g,"'");
      book.ISBN = (""+book.ISBN).replace(/"/g,"'");
      book.date_of_purchase = (""+book.date_of_purchase).replace(/"/g,"'");
      book.lang = (""+book.lang).replace(/"/g,"'");
      book.pages = (""+book.pages).replace(/"/g,"'");
      query += `("${book.title}","${book.author}","${book.classification_no}","${book.publisher}",${book.rack_no},${book.copy_no},"${book.ISBN}","${book.date_of_purchase}",${book.pages},"${book.lang}")`
      if(i != books.length-1)
        query += ",";
      i++;
    }
  }
  con.query(query, function(err,result){
    if(err) {
      fs.appendFile("exceptions.json", "" + i + "\n"+JSON.stringify(book) + "\n"+JSON.stringify(err)+"\n\n", function(){});
      err();
    }else{
      good += books.length;
      warn(result.warningCount);
    }
      return 0;
  });
  con.end();
  setInterval(function(){console.log(`Total Operations: ${getsucc()+geterr()}, (Errors: ${geterr()}, Succeded: ${getsucc()}), Waiting ${books.length-i}`);}, 1000)
  //process.exit(errors);
}
function getwarn(){
  return warnings;
}
function getsucc(){
  return good;
}
function geterr(){
  return errors;
}
/**
 * 
 * @param {Book} book 
 */
function fixBook(book, i){
  book.rack_no = localRand();
  book.classification_no = "" + book.classification_no +""+ localRand();
  book.ISBN = localRand();
  if(book.author == null || book.author == undefined || book.author.trim() == ""){
    book.author = "Default";
  }
  if(book.author == null || book.author == undefined || book.author.trim() == ""){
    book.author = "Default";
  }
  return book;
}
function localRand(){
  if(typeof localRand.uniques == 'undefined' || localRand.index == 10000){
    localRand.index = 0;
    localRand.uniques = [];
    var randindex = 0;
    for(var i = 0; i < 10000; i++){
      var unique;
      do{
        unique = 20 + Math.floor(3000*Math.random()) + Math.floor(99000000*Math.random());
      }while(localRand.uniques.indexOf(unique) != -1);
      localRand.uniques.push(unique);
    }
  }
  return localRand.uniques[localRand.index++];

}



function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function randomDate(start, end) {
  return randint(2000, 2019) + "-" + randint(1, 12) + "-" + randint(0, 28);
}