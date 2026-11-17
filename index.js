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
    document.getElementById("display-Year").innerText = "???";
    document.getElementById("display-Director").innerText = "???";
    document.getElementById("display-Actors").innerText = "???"; 
    document.getElementById("display-Plot").innerText = "???";
}

function buyClue(type, cost) {
    const display = document.getElementById(`display-${type}`);
    if (!currentMovie || display.innerText !== "???" || points < cost) return;

    points -= cost;
    document.getElementById("pointDisplay").innerText = points;
    display.innerText = currentMovie[type];
}

function submitGuess() {
    if (!currentMovie) return;

    const guess = document.getElementById("guessInput").value.trim().toLowerCase();
    
    if (guess === currentMovie.Title.toLowerCase()) {
        currentMovie = null;
        points += 5; 
        document.getElementById("pointDisplay").innerText = points;
        document.getElementById("feedbackMessage").innerText = "Correct!";
        
        index++;
        if (index < movieTitles.length) {
            setTimeout(loadMovie, 1500);
        } else {
            document.querySelector("main").innerHTML = `<h2>You Win! Final Points: ${points}</h2>`;
        }
    } else {
        document.getElementById("feedbackMessage").innerText = "Wrong, try again.";
    }
}

loadMovie();