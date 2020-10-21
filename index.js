/* eslint-disable indent */
// const apiKey='';
const endpointURL = 'https://api.github.com/users/';

function displayResults(responseJson, maxResults) {
    console.log(responseJson);

    $('#results-list').empty();

    for (let i = 0; i < responseJson.length & i < maxResults ; i++) {
        $('#results-list').append(
            `
            <li>
                <h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
                <p>Description: ${responseJson[i].description}</p>
                <p>Owner: @${responseJson[i].owner.login}</p>
            </li>
            `
        );
    }

    $('#results').removeClass('hidden');
}

function getRepos(query, maxResults) {
    const params = {
        username: query
    };
    console.log(params);

    const url = `${endpointURL}${query}/repos`;
    console.log(url);

    fetch(url, params)
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(responseJson => displayResults(responseJson, maxResults))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();

        const searchUser = $('#js-search-user').val();
        const maxResults = $('#js-max-results').val();

        getRepos(searchUser, maxResults);
    });
}

$(watchForm);