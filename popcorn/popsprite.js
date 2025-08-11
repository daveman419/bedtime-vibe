var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//create empty array
var images = [];
images.length = 4;

//push the images into array

for(i = 1 ; i < images.length ; i++){
    images[i] = new Image();
    images[i].src = 'popcorn (' + i.toString() +').png'
}

var i = 1;

setInterval(function(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    i++;
    if( i >= 4){
        i = 1;
    }
    c.drawImage(images[i], 100, 100, 100, 100);
},500) 