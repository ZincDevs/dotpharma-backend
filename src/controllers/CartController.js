/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import 'regenerator-runtime';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import { Cart } from '../db/models';

dotenv.config();
const UserController = {
  create: async (req, res) => {
    const { authUser: { u_id }, body: { quantity: c_quantity }, params: { m_id } } = req;
    const cartObj = {
      c_id: uuid(), c_quantity, m_id, u_id
    };
    let newCart = await Cart.create(cartObj);
    newCart = newCart?.dataValues;
    if (!newCart) return res.sendStatus(500);

    res.sendStatus(201);
  },
  update: async (req, res) => {
    const { body: { quantity: c_quantity }, params: { c_id } } = req;
    let result = await Cart.update({ c_quantity }, { where: { c_id } });
    if (!result.includes(1)) return res.sendStatus(204);

    res.sendStatus(200);
  },
  destroy: async (req, res) => {
    const { params: { c_id } } = req;
    let result = await Cart.destroy({ where: { c_id } });
    if (result <= 0) return res.sendStatus(204);
    res.sendStatus(200);
  },
};

export default UserController;
