let elSearchForm = $(".js-search-form"); 
let elSearchInput = $(".js-search-input", elSearchForm);
let elMoviesList = $(".movies-list" );
let elMovieTemplate = $("#movies-template").content;

kinolar.splice(100);

let normalizedMovies = kinolar.map((kino, i) =>{
  return{
    id: i + 1,
    title:kino.title,
    cast:kino.cast.join(", "),
    genres:kino.genres.join(", "),
    year:kino.year,
  }
})
console.log(normalizedMovies);

let createMovieElement = (movie) => {
  elMoviesList.innerHTML = "";

  let movieElement = elMovieTemplate.cloneNode(true);

  $(".card-title", movieElement).textContent = movie.title;
  $(".card-cast", movieElement).textContent = movie.cast;
  $(".card-genres", movieElement).textContent = movie.genres;
  $(".card-year", movieElement).textContent = movie.year;

  return movieElement;
}

let renderMovies = (movies) =>{
  let elResultFragment = document.createDocumentFragment();
  
  movies.forEach((movie) =>{
    elResultFragment.appendChild(createMovieElement(movie));
  })

  elMoviesList.appendChild(elResultFragment)
}
renderMovies(normalizedMovies);

elSearchForm.addEventListener("submit", (evt) =>{
  evt.preventDefault();

  let searchMovie =  new RegExp(elSearchInput.value.trim(), "gi");

  let searchResult = normalizedMovies.filter((movie) =>{
    if(movie.title.match(searchMovie)){
      return movie.title.match(searchMovie);
    }

    
  })
  renderMovies(searchResult);
})