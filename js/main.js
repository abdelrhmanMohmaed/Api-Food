//https://forkify-api.herokuapp.com/api/search?q=carrot   {api link}
let receipts = [];
let links = document.getElementsByClassName("nav-link");
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
        let currentMel = e.target.text;
        getRecipes(currentMel)
    })
}
getRecipes("pasta")
function getRecipes(meal) {
    let httpRequset = new XMLHttpRequest();
    httpRequset.open('get', `https://forkify-api.herokuapp.com/api/search?q=${meal}`)
    httpRequset.send();
    httpRequset.addEventListener('readystatechange', function () {
        if (httpRequset.readyState == 4) {
            receipts = JSON.parse(httpRequset.response).recipes;
            disPlayRecipes()
        }
    })
}

function disPlayRecipes() {
    let cols = ``;
    for (let i = 0; i < receipts.length; i++) {
        cols += ` 
        <div class="col-md-4">
        <div class="my-3">
        <img class="w-100 recipe-img" src="${receipts[i].image_url}">
        <h4>${receipts[i].title}</h4>
        <h5>publisher :${receipts[i].publisher}</h5>
        <button class="btn btn-info"> <a target='_blank' href="${receipts[i].source_url}" class="text-white"> Sours </a></button>
        <button class="btn btn-success"> <a target='_blank' href="${receipts[i].publisher_url}" class="text-white"> Detials </a></button>
        </div>
        </div>
        `
    }
    document.getElementById('posts').innerHTML = cols
}

$(document).ready(function () {
    $('#loading').fadeOut(2500, function () {
        $('body').css('overflow', 'visible')
    });
})

let postsOffset = $('#posts').offset().top;
$(window).scroll(function () {
    let topOffset = $(window).scrollTop();
    if (topOffset > 400) {
        $('#to-top').fadeIn(1350)
    }
    else {
        $('#to-top').fadeOut(1350)
    }
})

$('#to-top').click(function () {
    $('body,html').animate({ scrollTop: 0 }, 1500)
})
$('.nav-link').click(function () {
    let currentLinks = $(this).attr("href") // this= what's your click
    let secoffset = $(currentLinks).offset().top //hight posts or contcat or other links
    $('body,html').animate({ scrollTop: secoffset - 150 }, 1500)
})

