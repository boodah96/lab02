'use strict';
let keywordArr = [];
// creat constructor
function Image(val) {
    this.image_url = val.image_url;
    this.title = val.title;
    this.description = val.description;
    this.keyword = val.keyword;
    this.horns = val.horns;


}

//get data from JSON

$.ajax('./page-1.json')
    .then(data => {
        data.forEach(element => {
            let newImage = new Image(element);
            console.log(newImage);
            newImage.render();
            if (!(keywordArr.includes(newImage.keyword))) {
                keywordArr.push(newImage.keyword);
                console.log(keywordArr);
                let optionClone = $('.option').clone();
                optionClone.removeClass('option');
                optionClone.text(newImage.keyword);
                optionClone.attr('value', `${newImage.keyword}`)
                $('select').append(optionClone);
            }



        });
    }

    )
// creat render function
Image.prototype.render = function () {
    let divClone = $('.photo-template').clone();
    divClone.removeClass('photo-template');
    divClone.find('h2').text(this.title);
    divClone.find('p').text(this.description);
    divClone.find('img').attr('src', `${this.image_url}`);
    $('.render').append(divClone);

};
Image.prototype.renderNew = function () {
    let divClone = $('.photo-template').clone();
    divClone.removeClass('photo-template');
    divClone.find('h2').text(this.title);
    divClone.find('p').text(this.description);
    divClone.find('img').attr('src', `${this.image_url}`);
    $('.result').append(divClone);

};

// response to select
$('select').on('change', function () {
    $('.render').hide();
    $('.result').html("");

let choosenImage=($(this).val());
$.ajax('./page-1.json')
.then(data => {
        data.forEach(element=>{if(element.keyword===choosenImage){
            let newImage = new Image(element);
            newImage.renderNew();
        }} )
    
    })






})



