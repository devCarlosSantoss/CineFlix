const express = require("express");
const fetch = require('isomorphic-fetch');
require("dotenv").config();

const router = express.Router();

const apiKey = process.env.API_KEY;
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`
    }
};

// Filmes que estão no cinema
router.get("/api/now_playing", async (req, res) => {
    const apiURL = 'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=30&sort_by=popularity.desc';
    try {
        const response = await fetch(apiURL, options);
        const data = await response.json();
        console.log("DADOS", data);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
});

module.exports = router;
