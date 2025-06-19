import { getMovieReviewData } from './data.js';

let sortDecs = false;

function init() {
    const movieReviewData = getMovieReviewData();

    paintStats(movieReviewData);
    paintMovieDetails(movieReviewData);
    registerHandlers(movieReviewData);

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
    const sortedReviews = reviewsList.toSorted((a, b) => b.on - a.on);

    const movieListEl = document.querySelector('#movieListId ul');
    addMovieReviewData(movieListEl, sortedReviews);
    
}

function addMovieReviewData(movieListEl, reviews){
   
    removeAllChildNodes(movieListEl); 

    reviews.map((movie) => {
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

function registerHandlers(movieReviewData){
    const sortBtn = document.getElementById('sortBtnId');
    sortBtn.addEventListener('click', () => sortByRating(movieReviewData) );

    const groupByBtn = document.getElementById('groupById');
    groupByBtn.addEventListener('click', () => groupByTitle(movieReviewData));
}

function sortByRating(movieReviewData){
    const reviewList = movieReviewData.flat();
    sortDecs = !sortDecs;

    const sortedData = sortDecs
     ? reviewList.toSorted((a,b) => b.rating - a.rating)
     : reviewList.toSorted((a,b) => a.rating - b.rating);

    const movieListEl = document.querySelector('#movieListId ul');
    addMovieReviewData(movieListEl, sortedData);
}

// function groupByTitle(movieReviewData) {
//     const reviewsList = movieReviewData.flat();
//     const groupedReviews = reviewsList.reduce((acc, review) => {
//         if (!acc[review.title]) {
//             acc[review.title] = [];
//         }
//         acc[review.title].push(review);
//         return acc;
//     }, {});
//     console.log(groupedReviews);

//     const movieListEl = document.querySelector('#movieListId ul');
//     removeAllChildNodes(movieListEl);
//     Object.keys(groupedReviews).forEach((title) => {
//         const liEl = document.createElement('li');
//         liEl.classList.add('card', 'my-4', 'p-3');

//         const titleEL = document.createElement('h2');
//         titleEL.classList.add('text-2xl', 'mb-3');
//         titleEL.innerText = title;
//         liEl.appendChild(titleEL);

//         groupedReviews[title].forEach((review) => {
//             const contentEl = document.createElement('p');
//             contentEl.classList.add('mx-2', 'mb-2');
//             contentEl.innerText = review.content;
//             liEl.appendChild(contentEl);

//             const byOnEl = document.createElement('p');
//             byOnEl.classList.add('mx-2', 'mb-2');
//             byOnEl.innerText = `By: ${review.by} on ${new Date(review.on).toLocaleDateString()}`;
//             liEl.appendChild(byOnEl);
//         });

//         movieListEl.appendChild(liEl);
//     });
// }

function groupByTitle(movieReviewData){
    const reviewsList = movieReviewData.flat();
    const groupedReviews = Object.groupBy(reviewsList, ({title}) => title);

    const titleKeys = Reflect.ownKeys(groupedReviews);
    const movieListEl = document.querySelector('#movieListId ul');
    removeAllChildNodes(movieListEl);

    titleKeys.forEach((title) =>{
        const liEl = document.createElement('li');
        liEl.classList.add('card', 'my-4', 'p-3');
        
        const titleEL = document.createElement('h2');
        titleEL.classList.add('text-2xl', 'mb-3');
        titleEL.innerText = title;
        liEl.appendChild(titleEL);

        groupedReviews[title].forEach((review) => {
            const contentEl = document.createElement('p');
            contentEl.classList.add('mx-2', 'mb-2');
            contentEl.innerText = review.content;
            liEl.appendChild(contentEl);

            const byOnEl = document.createElement('p');
            byOnEl.classList.add('mx-2', 'mb-2');
            byOnEl.innerText = `By: ${review.by} on ${review.on ? new Date(review.on).toLocaleDateString() : "Unknown"}`;
            liEl.appendChild(byOnEl);

            const spacingEl = document.createElement('hr');
            spacingEl.classList.add('my-4');
            liEl.appendChild(spacingEl);
        })

        movieListEl.appendChild(liEl);
    })



}

function removeAllChildNodes(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

init();