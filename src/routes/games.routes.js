import { Router } from "express";
import { insertGame, listGames } from "../controller/games.controller.js";
import { validateGames } from "../middlewares/games.middleware.js";



const gamesRoutes = Router();



// iserir jogo
gamesRoutes.post('/games',validateGames,insertGame)//req,res,next


// listar jogos
gamesRoutes.get('/games',listGames)





export default gamesRoutes;

