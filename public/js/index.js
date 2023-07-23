async function getNowPlaying(){
    const imagesCarousel = document.querySelector(".imagesCarousel");
    try {
        const response = await fetch("/api/now_playing");
        const dataJson = await response.json();
        const data = dataJson.results;
        console.log(data);
        let moviesHTML = "";
        data.forEach(data => {
            moviesHTML += 
            `
            <img class="image" src="https://image.tmdb.org/t/p/original${data.poster_path}" alt="">
            `;
        });
        imagesCarousel.innerHTML = moviesHTML;
    } catch (error) {
        console.log(error)
    }
};

getNowPlaying();