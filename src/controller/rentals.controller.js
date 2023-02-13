import { db } from '../config/database.js';

export async function listRentals(req, res) {
    const rentals = await db.query(`SELECT json_build_object(
        'id', rentals.id,
        'customer.Id', rentals."customerId",
        'gameId', rentals."gameId",
        'rentDate', rentals."rentDate",
        'daysRented', rentals."gameId",
        'returnDate', rentals."returnDate",
        'originalPrice', rentals."originalPrice",
        'delayFee', rentals."delayFee",
        
        'customer', json_build_object(
            'id', customers.id,
            'name', customers.name
        ),
        'game', json_build_object(
            'id', games.id,
            'name', games.name
        )
    )
    FROM rentals
    JOIN customers
        ON rentals."customerId" = customers.id
    JOIN games
        ON rentals."gameId" = games.id;
    `)

    const result = rentals.rows.map(r => r.json_build_object)
    res.send(result)

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