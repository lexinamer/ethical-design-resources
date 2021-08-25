var catsArray = [];
var colors = ['#F479A3', '#E91F63', '#DE0F00', '#9D27B0', '#4E00D8', '#001FE0' ,'#2197F3', '#78AEFF', '#03BBD4', '#009688', '#4CAF50', '#076B0B', '#ABB92D', '#DAC406', '#FFC008', '#FF9800', '#FE470E', '#C60E00', '#816464'];
var index = 0;


// var url = 'https://sheets.googleapis.com/v4/spreadsheets/' +
//            '2PACX-1vTBlUdAPpIyAYeV7tvnEW3Jyne3Gj2k0g546qAydhfBkOH3vv8RaffWQjDsgnZu6xft1EDgxK67g7Gu' + '/values/' + 'Version1' +
//            '?alt=json&key=' + api_key;
// ($.getJSON(url, 'callback=?')).success(function(data) {
//   processData
// };

$(document).ready(function() {
  $.getJSON("resources.json", function(data){
      processData(data);
  }).fail(function(){
      console.log("An error has occurred.");
  });
});


// Process data from json file
function processData(data) {
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
        console.log(data[key].Title);

        var title = data[key].Title,
            desc = data[key].Description,
            image = data[key].Image,
            cat = data[key].Category,
            link = data[key].Link;

        // If category is new, push to array
        if(catsArray.indexOf(cat) === -1){
          catsArray.push(cat);
        }

        // Send data to cards function
        createCards(title,desc,image,cat,link);
    }
  }
  // for (let i = 0; i < data.length; i++) {
  //   console.log(data[i]);
  //   // Store data as variables
  //   var title = data[i].Title,
  //       desc = data[i].Description,
  //       image = data[i].Image,
  //       cat = data[i].Category,
  //       link = data[i].Link;
  //
  //   // If category is new, push to array
  //   if(catsArray.indexOf(cat) === -1){
  //     catsArray.push(cat);
  //   }
  //
  //   // Send data to cards function
  //   createCards(title,desc,image,cat,link);
  // };

  // Send array to filter function
  createFilter();

  // Match colors to categories
  matchColor();

};

// Create Filter
function createFilter() {

  // Alphebetize and print new categories to the page
  catsArray.sort();

  for (i = 0; i < catsArray.length; i++) {
    var catLink = catsArray[i].toLowerCase().replace(/\s/g, '');

    $('<li/>')
      .attr('data-category-type', catLink)
      .text(catsArray[i])
      .css('color', colors[index])
      .appendTo('.categories');

    index++
  }

  // Add filter
  $('.categories li').on('click', function(e) {
    e.preventDefault();

    var filter = $(this).data('categoryType');

    if(filter === 'all') {
      $('.card').show();
    } else {
      $('.card').hide();
      $('.card[data-category-type="'+ filter +'"]').show();
    }
  });
}


// Create cards
function createCards(title,desc,image,cat,link) {
  var dataCat = cat.toLowerCase().replace(/\s/g, '');

  var card =
    `<div class="card" data-category-type="${dataCat}">
        <a href="${link}" target="_blank">
          ${image ? `<img src="${image}" class="card-image" />` : '<span class="card-image noimg"></span>'}
          <div class="card-content">
            <p class="card-title">${title}</p>
            <p class="card-desc">${desc}</p>
            <span class="card-category">${cat}</span>
          </div>
        </a>
      </div>`

  $('.resources').append(card);
}

// Match colors to categories
function matchColor() {

  $('.card').each(function() {
    var x = $(this);

    $('.categories li').filter(function(i) {
      var y = $(this);

      if(x.attr('data-category-type') === y.attr('data-category-type') ){
        $(x).find('.card-category').css('backgroundColor', $(this).css('color'));
      }
    })
  });
}
