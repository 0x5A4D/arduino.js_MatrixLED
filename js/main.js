/*
 * Copyright (c) 2014 0x5A4D All Rights Reserved.
 * Released under The MIT License.
 * http://opensource.org/licenses/MIT
 */

// Device Port
var DEV_PORT = "COM3";

// 縦(アノード)
var COL1 =  9; // 13
var COL2 =  4; //  3
var COL3 =  3; //  4
var COL4 =  6; // 10
var COL5 =  2; //  6
var COL6 =  7; // 11
var COL7 = 11; // 15
var COL8 = 12; // 16

// 横(カソード)
var ROW1 =  5; //  9
var ROW2 = 10; // 14
var ROW3 = 18; //  8
var ROW4 =  8; // 12
var ROW5 = 14; //  1
var ROW6 = 17; //  7
var ROW7 = 15; //  2
var ROW8 = 16; //  5

var COLUMNS = [COL1, COL2, COL3, COL4, COL5, COL6, COL7, COL8];
var ROWS = [ROW1, ROW2, ROW3, ROW4, ROW5, ROW6, ROW7, ROW8];

// Arduino 定数
var OUTPUT = true;
var INPUT  = false;
var HIGH = 1;
var LOW = 0;

function enter(id){
    var row = id[1];
    var col = id[3];
    //console.log('enter: ('+row+','+col+')');
    
    $('#'+id).css('color','red');
    
    var arduino = document.arduino;
    arduino.digitalWrite(COLUMNS[col], HIGH);
    arduino.digitalWrite(ROWS[row], LOW);
}
function leave(id){
    var row = id[1];
    var col = id[3];
    //console.log('leave: ('+row+','+col+')');
    
    $('#'+id).css('color','inherit');
    
    var arduino = document.arduino;
    arduino.digitalWrite(COLUMNS[col], LOW);
    arduino.digitalWrite(ROWS[row], HIGH);
}

function setup(){
    try{
        with(document.arduino){
            open(DEV_PORT);
            for (var i = 0; i < 8; i++) {
                pinMode(COLUMNS[i], OUTPUT);
                digitalWrite(COLUMNS[i], LOW);
            }
            for (var i = 0; i < 8; i++) {
                pinMode(ROWS[i], OUTPUT);
                digitalWrite(ROWS[i], HIGH);  
            }
        }
    }catch(e){
        alert('Connection failed!');
    }
}

$(function(){
    // html
    $('#devPort').val(DEV_PORT);

    var mtx = $('#matrix');
    for(var i = 0; i < 8; i++){
        mtx.append('<tr id="row' + i + '"></tr>');
        var row = $('#row'+i);
        for(var j = 0; j < 8; j++){
            row.append('<td id="r' + i + 'c' + j + '">●</td>');
            $('#r' + i + 'c' + j).hover(
                function(){enter(this.id);},
                function(){leave(this.id);}
            );
        }
    }
    
    // arduino.jsインストール済みか
    if(!document.arduino){
        alert("arduino.js for webpages add-on is not installed.");
    }else{
        setup();
    }
});

function changeDevicePort(){
    DEV_PORT = $('#devPort').val();
    setup();
}