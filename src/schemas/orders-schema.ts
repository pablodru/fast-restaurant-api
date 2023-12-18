import Joi from 'joi';

export const preOrderSchema = Joi.object<PreOrderSchema>({
  productIds: Joi.array().items(Joi.number()).required(),
  additionalsIds: Joi.array().items(Joi.number()),
  name: Joi.string().required(),
  observation: Joi.string().allow(''),
});

export type PreOrderSchema = {
  productIds: number[];
  additionalsIds?: number[];
  name: string;
  observation?: string;
};

export const nameSchema = Joi.object({
  name: Joi.string().required(),
})

export type NameSchema = {
  name: string
}