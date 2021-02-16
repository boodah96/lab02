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
var page;

//get data from JSON
$('.page1').on('click',()=>{
    $('.render').empty();
    $('.newOption').remove();
    card('./page-1.json')

})
$('.page2').click(()=>{
    $('.render').empty();
    $('.newOption').remove();
    card('./page-2.json')


})
function card (page){
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

Image.prototype.render = function () {
    let divClone = this.toHtml();
    $('.render').append(divClone);

};


// response to select
$('select').on('change', function () {
    $('.render').empty();


let choosenImage=($(this).val());
$.ajax(`${page}`)
.then(data => {
        data.forEach(element=>{if(element.keyword===choosenImage){
            let newImage = new Image(element);
            newImage.render();
        }} )
    
    })






})

function addOption(newImage){
    let optionClone = $('.option').clone();
                optionClone.removeClass('option');
                optionClone.text(newImage.keyword);
                optionClone.attr('value', `${newImage.keyword}`)
                optionClone.attr('class','newOption')
                $('select').append(optionClone);
};

}


// Image.prototype.render = function () {
//     let divClone = $('.photo-template').clone();
//     divClone.removeClass('photo-template');
//     divClone.find('h2').text(this.title);
//     divClone.find('p').text(this.description);
//     divClone.find('img').attr('src', `${this.image_url}`);
//     $('.render').append(divClone);

// };