const apiKey = "caae5327";

async function fetchData() {
    try {
        const movieTitle = document.getElementById("movieTitle").value.trim();
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`)

        if (!response.ok) {
            throw new Error("Could not fetch resource")
        }
        const data = await response.json();
        const moviePoster = data.Poster;
        const imgElement = document.getElementById("moviePoster");

        imgElement.src = moviePoster;
        imgElement.style.display = "block";
    }
    catch(error) {
        console.error(error);
    }
}