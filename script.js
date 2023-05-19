{/* <div class="card mb-3">
<div class="card-body">
  <h5 class="card-title">Card title</h5>
  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
  <a href="#" class="btn btn-primary">Button</a> */}
var resultsEl = document.querySelector('#results');

function searchTopic(topic, format) {
    fetch('https://www.loc.gov/search/?q=baseball&fo=json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            resultsEl.innerHTML = null;
            for (var result of data.results) {
                var cardEl = document.createElement('div');
                var cardBody = document.createElement('div');
                var titleEl = document.createElement('h5');
                var cardText = document.createElement('p');
                var cardButton = document.createElement('a');
                cardEl.className = 'card mb-3';
                cardBody.className = 'card body';
                titleEl.className = 'card title';
                cardText.className = 'card text';
                cardButton.className = 'btn btn-primary';

                titleEl.textContent = result.title;
                cardText.textContent = result?.description.toString();
                cardButton.href = result.url;
                cardButton.textContent = 'Learn More';
                cardEl.appendChild(cardBody);
                cardBody.append(titleEl, cardText, cardButton);
                resultsEl.appendChild(cardEl);
            };
        });
}

function init() {
    searchTopic();
}


init();