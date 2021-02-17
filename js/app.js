'use strict';
// creat constructor


//get data from JSON
card('./page-1.json')

$('.page1').on('click', () => {

    $('.render').empty();
    $('.newOption').remove();
    card('./page-1.json')

})
$('.page2').on('click', () => {
    $('.render').empty();
    $('.newOption').remove();

    card('./page-2.json')

})


function card(page) {
    let keywordArr = [];
    function Image(val) {
        this.image_url = val.image_url;
        this.title = val.title;
        this.description = val.description;
        this.keyword = val.keyword;
        this.horns = val.horns;


    }
    Image.all = [];
    Image.choosen = [];

    $.ajax(`${page}`)
        .then(data => {

            data.forEach(element => {
                let newImage = new Image(element);
                Image.all.push(newImage);
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
    Image.prototype.toHtml = function () {
        let template = $('#template-neigh').html();
        let newcard = Mustache.render(template, this);
        return newcard;
    }
    // creat render function

    Image.prototype.render = function () {
        let divClone = this.toHtml();
        $('.render').append(divClone);

    };


    // response to select
    $('.selectCard').on('change', function () {
        $('.render').empty();
        sortOption();

        Image.choosen = [];


        let choice = ($(this).val());

        Image.all.forEach(element => {
            if (element.keyword === choice) {
                Image.choosen.push(element);
                element.render();
            }
        })

    })







    function addOption(newImage) {
        let optionClone = $('.option').clone();
        optionClone.removeClass('option');
        optionClone.text(newImage.keyword);
        optionClone.attr('value', `${newImage.keyword}`)
        optionClone.attr('class', 'newOption')
        $('.selectCard').append(optionClone);
    };


    $('.sort').on('change', function () {
        $('.render').empty();

        let choice = $(this).val();
        if(Image.choosen[0]){
            sortChoice(choice,Image.choosen);


        }else{      
              sortChoice(choice,Image.all);
        }
       

       

    });

    function sortChoice(choice,sortRender){
        if (choice === 'title') {
            sortByTitle(sortRender)
        }
        if (choice === 'horns') {
            sortByHorns(sortRender)
            
        }
        sortRender.forEach(element => {

            element.render();
        })
    };
    function sortByTitle(arr) {
        arr.sort((a, b) => {
            if (a.title.toUpperCase() > b.title.toUpperCase()) {
                return 1;
            } else if (a.title.toUpperCase() < b.title.toUpperCase()) {
                return -1;
            } else {
                return 0;
            }
        })


    };
    function sortByHorns(arr) {
        arr.sort((a, b) => {
            if (a.horns > b.horns) {
                return 1;
            } else if (a.horns < b.horns) {
                return -1;
            } else {
                return 0;
            }
        })

    };
    sortOption();
    function sortOption(){
    $('.newSort').remove();
    let choices=['title','horns'];
choices.forEach(element=>{
let optionClone = $('.sortOption').clone();
 optionClone.removeClass('sortOption');
 optionClone.addClass('newSort');

optionClone.text(`${element}`);
optionClone.attr('value', `${element}`);
$('.sort').append(optionClone)
})}

}




// Image.prototype.render = function () {
//     let divClone = $('.photo-template').clone();
//     divClone.removeClass('photo-template');
//     divClone.find('h2').text(this.title);
//     divClone.find('p').text(this.description);
    // divClone.find('img').attr('src', `${this.image_url}`);
//     $('.render').append(divClone);

// };