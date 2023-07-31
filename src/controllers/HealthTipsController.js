/* eslint-disable camelcase */
import 'regenerator-runtime';
import { v4 as uuid } from 'uuid';
import { HealthTip, User } from '../db/models';

const HealthTipController = {
  create: async (req, res) => {
    const data = {
      h_id: uuid(),
      h_title: req.body.title,
      h_image: req.body.image,
      h_category: req.body.category,
      h_description: req.body.content,
      u_id: req.body.uid,
    };
    const healthTip = await HealthTip.create(data);
    if (!healthTip) return res.sendStatus(500);
    return res.sendStatus(201);
  },
  update: async (req, res) => {
    const { h_id } = req.params;
    const data = {
      h_title: req.body.title,
      h_image: req.body.image,
      h_category: req.body.category,
      h_description: req.body.content,
      u_id: req.body.uid,
    };
    const healthTip = await HealthTip.update(data, { where: { h_id } });
    if (healthTip[0] === 0) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  },
  delete: async (req, res) => {
    const { hid } = req.params;
    const healthTip = await HealthTip.findOne({ where: { h_id: hid } });
    if (!healthTip) {
      return res.sendStatus(400);
    }
    await healthTip.destroy();
    return res.sendStatus(200);
  },
  findAll: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const healthTips = await HealthTip.findAll({
      include: [{ model: User, as: 'user' }],
      limit,
      offset
    });
    return res.json(healthTips);
  },
  findById: async (req, res) => {
    const { h_id } = req.params;
    let healthTip = await HealthTip.findOne({ where: { h_id } });
    healthTip = healthTip?.dataValues;
    if (!healthTip) {
      return res.sendStatus(204);
    }
    return res.json(healthTip);
  },
};

export default HealthTipController;
