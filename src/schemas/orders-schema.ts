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

export const nameSchema = Joi.object<NameSchema>({
  name: Joi.string().trim().required(),
});

export type NameSchema = {
  name: string;
};

export const closeOrderSchema = Joi.object<CloseOrderSchemaType>({
  oldName: Joi.string().trim().required(),
  newName: Joi.string().trim().required(),
});

export type CloseOrderSchemaType = {
  oldName: string;
  newName: string;
};

export const orderReadySchema = Joi.object<OrderReadyType>({
  id: Joi.number().required(),
});

export type OrderReadyType = {
  id: number;
};
