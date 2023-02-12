import { gameSchema } from "../model/gameSchemas.js";
import { db } from "../config/database.js";

export async function validateGames(req,res,next){
// pegando o body da requisição
const game = req.body

// comparar o body com o gameSchema
const {error} = gameSchema.validate(game)

if(error){
    return res.sendStatus(400)
}

// verificar se o jogo existe no banco de dados

const duplicatedGame = await db.query(`SELECT * FROM games WHERE name = $1`, [game.name]);

if(duplicatedGame.rows[0]){
   return res.sendStatus(409)
}

next()

}