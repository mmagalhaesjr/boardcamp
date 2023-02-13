import { rentalsSchema } from "../model/schemas.js";
import { db } from "../config/database.js";




export async function validateRentals(req, res, next) {
    // recerber o e verificar o body,se nao, status400
    const rentals = req.body;
    const { error } = rentalsSchema.validate(rentals);

    if (error) {
        return res.sendStatus(400);
    }
    // verificar se custumers id é um cliente existente se nao, status400
    const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [rentals.customerId]);

    if (!customer.rows[0]) {
        return res.sendStatus(400);
    }
    // verificar gameId é existente, se nao status400

    const game = await db.query(`SELECT * FROM games WHERE id = $1`, [rentals.gameId]);

    if (!game.rows[0]) {
        return res.sendStatus(400);
    }

    //validar se exite jogos disponiveis

    //ver a quantidade em estoque dos jogos
    const stockGames = game.rows[0].stockTotal;

    //verificaer a quantidade de jogos alugados
    const gamesAlreadyRented = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`, [rentals.gameId]);

    // se quantidade de jogos alugados for igual a qtd de jogos disponiveis, res.sendStatus400
    if (stockGames == gamesAlreadyRented.rowCount) {
        return res.sendStatus(400)
    }

    res.locals.game = game.rows[0]

    next()
}


export async function verifyRentalIdToDelete(req, res, next) {
    const rentalId = req.params.id
    const rental = await db.query(`SELECT * FROM rentals WHERE id = $1`, [rentalId])

    if (!rental.rows[0]) {
        return res.sendStatus(404)
    }

    if (!rental.rows[0].returnDate) {
        return res.sendStatus(400)
    }

    next()
}


export async function validateDevolution(req, res, next) {
    const rentalId = req.params.id

    const rental = await db.query(`SELECT * FROM rentals WHERE id = $1`, [rentalId])

    if (!rental.rows[0]) {
        return res.sendStatus(404)
    }

    if(rental.rows[0].returnDate){
    return res.sendStatus(400)
    }

    res.locals.rental = rental.rows[0]

    next()
}