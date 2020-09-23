// Initialize Tabletop to get gSheet data
let publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/14BMlTl5g0nZmyLzTq4v4ohXAWLeUNyLP0cIKRVO_88U/pubhtml';

function init() {
  Tabletop.init({ key: publicSpreadsheetUrl,
    callback: processData,
    simpleSheet: true })
};

// Process data from gSheet
function processData(data) {

  for (let i = 0; i < data.length; i++) {
    var title = data[i].Title,
        desc = data[i].Description,
        image = data[i].Image,
        cat = data[i].Category,
        link = data[i].Link;

    createCategories(cat);
    createCards(title,desc,image,cat,link);
  };
};

// Create Categories
function createCategories(cat) {
  console.log(cat);
  var cat =
    `<li><a href="#">${cat}</a></li>`

  $('.categories').append(cat);
}


// Create cards
function createCards(title,desc,image,cat,link) {
  var card =
    `<a href="${link}" target="_blank">
      <div class="card">
        ${image ? `<img src="${image}" class="card-image" />` : '<span class="card-image noimg"></span>'}
        <div class="card-content">
          <p class="card-title">${title}</p>
          <p class="card-desc">${desc}</p>
          <span class="category ${cat}">${cat}</span>
        </div>
      </div>
    </a>`

  $('.resources').append(card);
}

init();
