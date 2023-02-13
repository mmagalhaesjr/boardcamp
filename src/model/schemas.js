
import Joi from 'joi'

export const gameSchema = Joi.object({
    name: Joi.string().min(1).required(),
    image: Joi.string().uri().required(),
    stockTotal: Joi.number().min(1).required(),
    pricePerDay: Joi.number().min(1).required(),

})


export const customerSchema = Joi.object({
    name:Joi.string().min(1).required(),
    phone:Joi.string().regex(/^\d+$/).min(10).max(11).required(),
    cpf:Joi.string().regex(/^\d+$/).length(11).required(),
    birthday:Joi.date().iso().required()

})


export const rentalsSchema = Joi.object({
    
    customerId: Joi.number().min(1).required(),
    gameId: Joi.number().min(1).required(),
    daysRented: Joi.number().min(1).required()
})