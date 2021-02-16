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
let page='./page-1.json';
$('.page1').click(()=>{
    page='./page-1.json';

})
$('.page1').click(()=>{
    page='./page-1.json';

})
$.ajax(`${page}`)
    .then(data => {
        data.forEach(element => {
            let newImage = new Image(element);
            newImage.render();
            if (!(keywordArr.includes(newImage.keyword))) {
                keywordArr.push(newImage.keyword);
                addOption(newImage);
            }



        });
        ;
    }

    )
    // to html function
    Image.prototype.toHtml=function(){
        let template=$('#template-neigh').html();
        let newcard=Mustache.render(template,this);
        return newcard;
    }
// creat render function
// Image.prototype.render = function () {
//     let divClone = $('.photo-template').clone();
//     divClone.removeClass('photo-template');
//     divClone.find('h2').text(this.title);
//     divClone.find('p').text(this.description);
//     divClone.find('img').attr('src', `${this.image_url}`);
//     $('.render').append(divClone);

// };
Image.prototype.render = function () {
    let divClone = this.toHtml();
    $('.render').append(divClone);

};
Image.prototype.renderNew = function () {
    let divClone = this.toHtml();
    $('.result').append(divClone);

};

// response to select
$('select').on('change', function () {
    $('.render').hide();
    $('.result').html("");

let choosenImage=($(this).val());
$.ajax(`${page}`)
.then(data => {
        data.forEach(element=>{if(element.keyword===choosenImage){
            let newImage = new Image(element);
            newImage.renderNew();
        }} )
    
    })






})

function addOption(newImage){
    let optionClone = $('.option').clone();
                optionClone.removeClass('option');
                optionClone.text(newImage.keyword);
                optionClone.attr('value', `${newImage.keyword}`)
                $('select').append(optionClone);
};

