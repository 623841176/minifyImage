import {changeImage} from './minifyImage.js'
var $prev = document.querySelector("#prev");
var $picker = document.querySelector("#picker");

$picker.addEventListener("change", function(event) {
    var file = event.target.files[0]
    changeImage(file, 375).then(function(res){
        var reader = new FileReader();
        reader.onload = function(){
            var url=reader.result;
            $prev.src = url;
        }
        reader.readAsDataURL(res);
    });
});