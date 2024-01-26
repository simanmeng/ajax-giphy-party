console.log("Let's get this party started!");
const $searchInput = $('#search');
const $gifArea = $('.display');
const $removeBtn = $('#removeBtn');

//the function to create a gif on the html from the response of the GET request
function displayGif (res) {
    let numResult = res.data.data.length;
    if(numResult) {
        let gifIdx = Math.floor(Math.random() * res.data.data.length);
        let gifURL = res.data.data[gifIdx].images.original.url;
        console.log(gifURL);
        
        let $newGif = $('<img>', {src: gifURL, alt: 'gif'});
        $gifArea.append($newGif);
    } else {
        alert('Sorry, we were not able to find any gifs based on your input term. Please try again!')
    }
}

//send an axios GET request to the api upon submission of the form and then create a gif in the html
$('.searchForm').on('submit', async function (evt) {
    evt.preventDefault();
    let searchTerm = $searchInput.val();
    $searchInput.val('');

    let response = await axios.get('http://api.giphy.com/v1/gifs/search', { params: { q: searchTerm, api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'}});
    displayGif(response);
})

//remove all gifs upon click of the remove button
$removeBtn.on('click', function (evt) {
    $gifArea.empty();
})