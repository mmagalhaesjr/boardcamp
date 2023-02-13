import { db } from '../config/database.js';

export async function listRentals(req, res) {
    const rentals = await db.query(`SELECT * FROM rentals`)
    res.send(rentals.rows)

    // tem que incluir as infos do costumer e o game tb na resposta
}

export async function insertRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body

    const rentDate = new Date().toISOString().split('T')[0]

    const originalPrice = daysRented * res.locals.game.pricePerDay

    await db.query(`INSERT INTO rentals
    ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
    VALUES ($1, $2, $3, $4, $5, $6, $7)`, [customerId, gameId, rentDate, daysRented, null, originalPrice, null])

    res.sendStatus(201)
}

export async function deleteRental(req, res) {
    const rentalId = req.params.id
    await db.query(`DELETE FROM rentals WHERE id = $1`, [rentalId])
    res.sendStatus(200)
}