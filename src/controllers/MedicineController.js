/* eslint-disable camelcase */
import 'regenerator-runtime';
import { v4 as uuid } from 'uuid';
import Sequelize from 'sequelize';
import { Medicine, User } from '../db/models';

const MedicineController = {
  createMedicine: async (req, res) => {
    const { authUser, body } = req;
    const data = {
      m_id: uuid(),
      m_name: body.name,
      m_properties: body.properties,
      m_desciption: body.description,
      m_image: body.image,
      m_price: body.price,
      m_status: '1',
      m_short_descripption: body.shortdescription,
      m_type: body.category,
      m_discount: body.discount || 0,
      u_id: authUser.u_id,
      m_tags: req.body.tags || []
    };

    const medicine = await Medicine.create(data);
    if (!medicine) return res.sendStatus(500);
    return res.sendStatus(201);
  },
  updateMedicine: async (req, res) => {
    const { body, authUser } = req;
    const { m_id } = req.params;
    console.log(body.image);
    const data = {
      m_name: body.name,
      m_properties: body.properties,
      m_desciption: body.description,
      m_image: body.image,
      m_price: body.price,
      m_short_descripption: body.shortdescription,
      m_type: body.category,
      m_discount: body.discount || 0,
      m_status: '1',
      u_id: authUser.u_id,
      m_tags: body.m_tags
    };
    const medicine = await Medicine.update(data, { where: { m_id } });
    if (medicine[0] === 0) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  },
  findAll: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const count = await Medicine.count();
    const medicines = await Medicine.findAll({
      order: [
        Sequelize.literal("m_tags @> ARRAY['Popular']::varchar[] DESC"),
      ],
      include: [{ model: User, as: 'user' }],
      limit,
      offset
    });
    res.json({ medicines, count });
  },
  deleteMedicine: async (req, res) => {
    const { m_id } = req.params;
    const medicine = await Medicine.findOne({ where: { m_id } });
    if (!medicine) {
      return res.sendStatus(400);
    }
    await medicine.destroy();
    return res.sendStatus(200);
  },
  findById: async (req, res) => {
    const { m_id } = req.params;
    let medicine = await Medicine.findOne({ where: { m_id } });
    medicine = medicine?.dataValues;
    if (!medicine) {
      return res.sendStatus(204);
    }
    return res.json(medicine);
  },
};

export default MedicineController;
