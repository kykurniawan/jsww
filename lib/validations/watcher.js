import Joi from 'joi'
import joiObjectId from 'joi-objectid'
Joi.objectId = joiObjectId(Joi)

export const createWatcherSchema = Joi.object({
  userId: Joi.objectId().required(),
  name: Joi.string().min(1).max(30).required()
})