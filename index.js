// API key for OMDb API
const apiKey = "bfda88fd";

// List of chosen movies
const movieTitles = [
    "Magnolia",
    "La La Land",
    "Good Will Hunting",
    "Sentimental Value",
    "Memento",
    "Whiplash",
    "Shutter Island",
    "The Invite",
    "The Iron Claw",
    "The Witch"
]

let index = 0;
let points = 20;
let currentMovie = null;

async function loadMovie() {
    document.getElementById("movieCounter").innerText = index + 1;
    document.getElementById("feedbackMessage").innerText = "Loading...";
    
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitles[index])}`);
    currentMovie = await res.json();

    document.getElementById("feedbackMessage").innerText = "";
    document.getElementById("guessInput").value = "";
    document.getElementById("display-Year").innerText = "";
    document.getElementById("display-Director").innerText = "";
    document.getElementById("display-Actors").innerText = "";
    document.getElementById("display-Plot").innerText = "";
    document.querySelectorAll("#clues-board > button").forEach(tile => {
        tile.classList.remove("revealed");
    });
}

function buyClue(type, cost) {
    const display = document.getElementById(`display-${type}`);
    if (!currentMovie || display.innerText !== "" || points < cost) return;

    points -= cost;
    document.getElementById("pointDisplay").innerText = points;
    display.innerText = currentMovie[type];
    display.parentElement.classList.add("revealed");
}

function submitGuess() {
    if (!currentMovie) return;

    const guess = document.getElementById("guessInput").value.trim().toLowerCase();
    
    if (guess === currentMovie.Title.toLowerCase()) {
        const guessedMovie = currentMovie;
        currentMovie = null;
        points += 5; 
        document.getElementById("pointDisplay").innerText = points;
        document.getElementById("feedbackMessage").innerText = "Correct!";

        const moviePoster = document.getElementById("moviePoster");
        const hasPoster = guessedMovie.Poster && guessedMovie.Poster !== "N/A";
        moviePoster.hidden = !hasPoster;
        document.getElementById("posterUnavailable").hidden = hasPoster;
        if (hasPoster) {
            moviePoster.src = guessedMovie.Poster;
            moviePoster.alt = `Poster for ${guessedMovie.Title}`;
        }

        document.getElementById("movie-result").hidden = false;
        document.getElementById("nextMovieButton").textContent =
            index === movieTitles.length - 1 ? "Finish game" : "Next movie";
    } else {
        document.getElementById("feedbackMessage").innerText = "Wrong, try again.";
    }
}

function advanceGame() {
    if (index === movieTitles.length - 1) {
        document.getElementById("feedbackMessage").innerText = `You Win! Final Points: ${points}`;
        document.getElementById("nextMovieButton").hidden = true;
        return;
    }

    index++;
    document.getElementById("movie-result").hidden = true;
    loadMovie();
}

loadMovie();