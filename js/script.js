// Wait for the HTML content to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Fetch the student information element and set its content
    const studentInfo = document.getElementById('student-info');
    studentInfo.textContent = 'Student ID: 200542632 | Name: Ansh Patel';
});

// Function to initiate a movie search
function searchMovie() {
    // Fetch input elements for movie name and suggestions dropdown
    const searchInput = document.getElementById('search-input');
    const suggestionDropdown = document.getElementById('suggestions');
    
    // Extract selected suggestion or entered movie name
    const selectedSuggestion = suggestionDropdown.value.trim();
    const movieName = searchInput.value.trim() || selectedSuggestion;

    // It will check if a valid movie name is provided, then initiate data fetching
    if (movieName !== '') {
        fetchDataFromAPI(movieName);
    } else {
        // will display this if invalid name would given by user
        alert('Please enter a valid movie name.');
    }
}

// Function to fetch movie data from the OMDB API
function fetchDataFromAPI(movieName) {
    // this is my personal api key from ombd site
    const apiKey = 'a771b4e0';
    
    // API URL to get access data from omdb
    const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(movieName)}&apikey=${apiKey}`;

    // Perform a fetch request to the OMDB API
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Fetch the container where API data will be displayed
        const apiDataContainer = document.getElementById('api-data');
        
        // Check if the API response is successful and contains search results
        if (data.Response === 'True' && data.Search) {
            // Display a list of movies based on the search results
            const moviesList = data.Search.map(movie => `
                <div>
                    <h2>${movie.Title}</h2>
                    <p>Year: ${movie.Year}</p>
                    <p>Type: ${movie.Type}</p>
                    <p>IMDb ID: ${movie.imdbID}</p>
                    <img src="${movie.Poster}" alt="${movie.Title} Poster" style="max-width: 200px;">
                </div>
            `).join('');

            // Set the HTML content of the container with the movies list
            apiDataContainer.innerHTML = moviesList;
        } else {
            // Display a message if no results are found
            apiDataContainer.textContent = 'No results found.';
        }
    })
    .catch(error => console.error('Error fetching data:', error));
}
