var resultsEl = document.querySelector('#results');
var resultTitle = document.querySelector('#result-title')
var qInput = document.querySelector('#q');
var formatInput = document.querySelector('#format');
var searchForm = document.querySelector('#search-form');

function handleSearchForm(event) {
    event.preventDefault();

    var q = qInput.value.trim();
    var format = formatInput.value;

    var searchParams = new URLSearchParams();
    searchParams.append('q', q);
    searchParams.append('format', format);

    if (!resultsEl) {
        document.location.replace('./search-results.html?' + searchParams.toString());
    };

    searchTopic(q, format)
}

function searchTopic(q, format) {
    var apiUrl = 'https://www.loc.gov/search/?q=' + q + '&fo=json';

    if (format) {
        apiUrl = 'https://www.loc.gov/' + format + '/?q=' + q + '&fo=json';
    };

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            resultsEl.innerHTML = null;
            resultTitle.textContent = qInput.value;
            if (data.results.length === 0) {
                resultsEl.textContent = "No Results Found";
                return;
            }
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
    console.log('PARAMS', document.location.search);
    var searchParams = new URLSearchParams(document.location.search);
    var q = searchParams.get('q');
    var format = searchParams.get('format');

    if (q) {
        qInput.value = q;
        formatInput.value = format;
        searchTopic(q, format);   
    };
}

searchForm.addEventListener('submit', handleSearchForm);
document.addEventListener('DOMContentLoaded', init);