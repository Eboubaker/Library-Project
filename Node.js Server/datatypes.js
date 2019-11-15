class Book{
  constructor(){
    this.author = "";
    this.title = "";
    this.pages = 0;
    this.lang = "";
    this.ISBN = "";
    this.rack_no = 0;
    this.copy_no = 0;
    this.date_of_purchase = null;
    this.classification_no = "";
    this.edition_no = 0;
  }
}
module.exports = Book;