import Joi from "joi";

export const preOrderSchema = Joi.object<preOrderSchema>({
    productIds: Joi.array().items(Joi.number()).required(),
    additionalsIds: Joi.array().items(Joi.number()),
    name: Joi.string().required(),
})

export type preOrderSchema = {
    productIds: number[];
    additionalsIds?: number[];
    name: string;
}