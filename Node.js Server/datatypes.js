class Book{
  /**
   * 
   * @param {String} auth 
   * @param {String} title 
   * @param {Number} pages 
   * @param {String} lang 
   * @param {Number} rack 
   * @param {Number} copy 
   * @param {String} clas 
   * @param {String} isbn 
   * @param {String} dpur 
   * @param {Number} edi 
   * @param {String} pub 
   */
  constructor(auth, title, pages, lang, rack, copy, clas, isbn, dpur, edi, pub){
    this.author = auth;
    this.title = title;
    this.pages = pages;
    this.lang = lang;
    this.ISBN = isbn || "default";
    this.rack_no = rack;
    this.copy_no = copy;
    this.date_of_purchase = dpur || "2012-12-12";
    this.classification_no = clas;
    this.edition_no = edi || 0;
    this.publisher = pub || "default";
  }
}
module.exports = Book;