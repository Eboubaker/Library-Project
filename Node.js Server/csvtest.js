$ = require("jquery");
var fs = require("fs");
var csvparser = require("jquery-csv");

var c = fs.readFile("sample2.csv", processData);

/**
 * 
 * @param {NodeJS.ErrnoException} err 
 * @param {Buffer} filedata 
 */
function processData(err, bytes) {
    if(err){
        console.log(err.message);
    }/* 
    var data = buffer.; */
    var filedata = (" " + bytes);
    console.log(parseCSV(filedata));
    /*
    var rows = [];
    var colsno = 1+commacount(filedata);
    for(let i=0;i<colsno;i++)
        rows.push([]);
    bytes = null;
    let index = 0;
    filedata = filedata.slice(filedata.indexOf('\n'), filedata.length);
    var val = "";
    var n = 0;
    for(; n < filedata.length;n++){
        let char = filedata.charAt(n);
        if(char == '\n'){
            continue;
        }else if(char == ',' && filedata.charAt(n+1) != '\n'){
            rows[index].push(val);
            val = "";
            index++
            if(index == rows.length)
                index = 0;
            continue;
        }else if(char == "'"){
            for(let i = n + 1; i < filedata.length;i++){
                var char2 = filedata.charAt(i);
                if(char2 == ','){
                    n = i;
                    break;
                }if(char2 == "'"){
                    n = i + 1;
                    break;
                }
                val += char2;
            }
        }else if(char == '"'){
            for(let i = n + 1; i < filedata.length;i++){
                var char2 = filedata.charAt(i);
                if(char2 == ','){
                    n = i;
                    break;
                }
                if(char2 == '"'){
                    n = i + 1;
                    break;
                }
                val += char2;
            }
        }else
            val += char;
    }
    for(let i = 0; i < rows[0].length; i++){
        var str = "";
        for(let j = 0; j < rows.length; j++){
            str += rows[j][i] + " || ";
        }
        //console.log(str);
    }
    */
}
function commacount(str){
    var count = 0;
    for(var char of str)
        if(char == ',')
            count++;
        else if(char == '\n')
            break;
    return count;
}

/**
 * Wrapped csv line parser
 * @param s string delimited csv string
 * @param sep separator override
 * @attribution : http://www.greywyvern.com/?post=258 (comments closed on blog :( )
 */
function parseCSV(s,sep) {
    // http://stackoverflow.com/questions/1155678/javascript-string-newline-character
    var universalNewline = /\r\n|\r|\n/g;
    var a = s.split(universalNewline);
    for(var i in a){
        for (var f = a[i].split(sep = sep || ","), x = f.length - 1, tl; x >= 0; x--) {
            if (f[x].replace(/"\s+$/, '"').charAt(f[x].length - 1) == '"') {
                if ((tl = f[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
                    f[x] = f[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
                    } else if (x) {
                f.splice(x - 1, 2, [f[x - 1], f[x]].join(sep));
                } else f = f.shift().split(sep).concat(f);
            } else f[x].replace(/""/g, '"');
        } a[i] = f;
    }
    return a;
}