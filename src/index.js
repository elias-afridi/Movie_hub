import { getMovieReviewData } from './data.js';
console.log('Movie Review Data:', getMovieReviewData());

function init() {
    const movieReviewData = getMovieReviewData();

    paintStats(movieReviewData);
    paintMovieDetails(movieReviewData);

}

function paintStats(movieReviewData) {
    const totalMovies = movieReviewData.length;
    const reviewsList = movieReviewData.flat();
    const totalReviews = reviewsList.length;
    const avgRating = reviewsList.reduce((acc, review) => acc + review.rating, 0) / totalReviews;

    /* const moviesElement = document.getElementById('tMoviesId');
    moviesElement.appendChild(document.createElement('h2')).innerText ='Total Movies: '+ totalMovies;

    const reviewsElement = document.getElementById('tReviewsId'); 
    reviewsElement.appendChild(document.createElement('h2')).innerText = 'Total reviews: ' + totalReviews;

    const avgRatingElement = document.getElementById('avgRatingId');
    avgRatingElement.appendChild(document.createElement('h2')).innerText = 'Average Rating: ' + avgRating.toFixed(2);
    
    */

    const totalMoviesEL = document.getElementById('tMoviesId');
    addStat(totalMoviesEL, totalMovies);

    const avgRatingEL = document.getElementById('avgRatingId');
    addStat(avgRatingEL, avgRating.toFixed(2));

    const totalReviewEl = document.getElementById('tReviewsId');
    addStat(totalReviewEl, totalReviews);
}

function addStat(element, value) {
    const spanEl = document.createElement('span');
    spanEl.innerText = value;
    spanEl.classList.add('text-2xl');
    element.appendChild(spanEl);
}

function paintMovieDetails(movieReviewData) {
    const reviewsList = movieReviewData.flat();

    const movieListEl = document.querySelector('#movieListId ul');

    reviewsList.map((movie) => {
        const liEl = document.createElement('li');
        liEl.classList.add('card', 'my-4', 'p-3');

        const titleEL = document.createElement('h2');
        titleEL.classList.add('text-2xl', 'mb-3');
        titleEL.innerText = `${movie.title} - ${movie.rating}`;
        liEl.appendChild(titleEL);

        const contentEl = document.createElement('p');
        contentEl.classList.add('mx-2', 'mb-2');
        contentEl.innerText = movie.content;
        liEl.appendChild(contentEl);

        const byOnEl = document.createElement('p');
        byOnEl.classList.add('mx-2', 'mb-2');
        byOnEl.innerText = `By: ${movie.by} on ${new Date(movie.on).toLocaleDateString()}`;
        liEl.appendChild(byOnEl);

        movieListEl.appendChild(liEl);

    })
}


init();