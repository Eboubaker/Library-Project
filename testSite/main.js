function loadBooksTest(count){
    var container = document.getElementsByClassName('popular-books-container')[0];
    for(var i = 0; i < count; i++){
        var sample = document.createElement('div');
    var hsample = document.createElement('h2');
    var textNode = document.createTextNode('math '+i);
    hsample.appendChild(textNode);
    sample.classList.add('popular-books');
    sample.appendChild(hsample)
        container.appendChild(sample);
    }
}
var choices = document.getElementById('catig-list');
choices.addEventListener('change',function(event){lis.childNodes[1].remove();});
loadBooksTest(5);

