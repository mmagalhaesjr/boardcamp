import { db } from "../config/database.js";

export async function insertGame(req,res){
    const game = req.body
    await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, [game.name, game.image, game.stockTotal, game.pricePerDay])
    res.sendStatus(201)

}


export async function listGames(req,res){
     const games = await db.query(`SELECT * FROM games `)
     
    res.send(games.rows)

}