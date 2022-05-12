/* eslint-disable camelcase */
import 'regenerator-runtime';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { Medicine, User } from '../db/models';
import { STATUSES } from '../constants/ResponseStatuses';

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
      m_type: body.type,
      u_id: authUser.u_id,
    };

    const medicine = await Medicine.create(data);
    if (!medicine) return res.sendStatus(500);
    return res.sendStatus(201);
  },
  updateMedicine: async (req, res) => {
    const data = [
      req.body.name,
      req.body.properties,
      req.body.description,
      req.body.image,
      req.body.price,
      req.body.type,
      moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      req.user.u_id,
      req.params.mid,
    ];
    Medicine.update(data)
      .then((response) => {
        res.status(response.status).send({
          status: response.status,
          message: response.message,
          data: response.data,
        });
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
        });
      });
  },
  findAll: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const medicines = await Medicine.findAll({
      include: [{ model: User, as: 'user' }],
      limit,
      offset
    });
    res.json(medicines);
  },
  deleteMedicine: async (req, res) => {
    Medicine.destroy(req.params.mid)
      .then((response) => {
        res.status(response.status).send({
          status: response.status,
          message: response.message,
          data: response.data,
        });
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
          data: null,
        });
      });
  },
  findById: async (req, res) => {
    const { m_id } = req.params;
    let medicine = await Medicine.findOne({ where: { m_id } });
    medicine = medicine?.dataValues;
    if (!medicine) {
      res.sendStatus(204);
    } else {
      res.json(medicine);
    }
  },
};

export default MedicineController;
