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

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Rota para obter os filmes em exibição (now playing) da API do TMDb
app.get('/filmes-em-exibicao', async (req, res) => {
  try {
    const apiURL = 'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1&sort_by=popularity.desc';
    const apiKey = 'sua_chave_de_api_do_tmdb'; // Substitua pela sua chave de API do TMDb

    const response = await axios.get(`${apiURL}&api_key=${apiKey}`);
    const filmes = response.data.results;
    res.json(filmes);
  } catch (error) {
    console.error('Erro ao obter filmes em exibição:', error.message);
    res.status(500).json({ mensagem: 'Erro ao obter filmes em exibição' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
