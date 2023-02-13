import { db } from '../config/database.js';

export async function listRentals(req, res) {
    const rentals = await db.query(`SELECT json_build_object(
        'id', rentals.id,
        'customer.Id', rentals."customerId",
        'gameId', rentals."gameId",
        'rentDate', rentals."rentDate",
        'daysRented', rentals."daysRented",
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

export async function finishRental(req, res) {
    const rentalId = req.params.id
    const returnDate = new Date()
    const pricePerDay = res.locals.rental.originalPrice / res.locals.rental.daysRented
    const rentDate = new Date(res.locals.rental.rentDate);
    const daysRented = (res.locals.rental.daysRented * 1000 * 3600 * 24)
    const dayToReturn = new Date(rentDate.getTime() + daysRented)
    const daysDelayed = (returnDate.getTime() - dayToReturn.getTime()) / (1000 * 3600 * 24) 

    const delayFee = parseInt(daysDelayed) * pricePerDay
    returnDate.toISOString().split('T')[0]
    console.log(returnDate, delayFee, rentalId, daysDelayed)
    const update = await db.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`,[returnDate, delayFee, rentalId])

    res.sendStatus(200)
}


export async function deleteRental(req, res) {
    const rentalId = req.params.id
    await db.query(`DELETE FROM rentals WHERE id = $1`, [rentalId])
    res.sendStatus(200)
}

