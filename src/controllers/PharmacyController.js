/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { MESSAGES } from '../constants/ResponceMessages';
import { STATUSES } from '../constants/ResponseStatuses';

import { Pharmacy, User } from '../db/models';

const PharmacyController = {
  CreatePharmacy: async (req, res) => {
    const payload = {
      ph_id: uuid(),
      ph_name: req.body.name,
      ph_email: req.body.email,
      ph_phone: req.body.phone,
      ph_website: req.body.website,
      ph_address: req.body.address,
      ph_status: '1',
      u_id: req.authUser.u_id,
    };
    const medicine = await Pharmacy.create(payload);
    if (!medicine) return res.sendStatus(500);
    return res.sendStatus(201);
  },
  updatePharmacy: async (req, res) => {
    const payload = {
      ph_name: req.body.name,
      ph_email: req.body.email,
      ph_phone: req.body.phone,
      ph_website: req.body.website,
      ph_address: req.body.address,
      ph_status: '1',
      u_id: req.authUser.u_id,
    };
    const { ph_id } = req.params;

    const medicine = await Pharmacy.update(payload, { where: { ph_id } });
    if (medicine[0] === 0) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  },
  deletePharmacy: async (req, res) => {
    const { ph_id } = req.params;
    const pharmacy = await Pharmacy.findOne({ where: { ph_id } });
    if (!pharmacy) {
      return res.sendStatus(400);
    }
    await pharmacy.destroy();
    return res.sendStatus(200);
  },
  findAll: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const pharmanies = await Pharmacy.findAll({
      include: [{ model: User, as: 'user' }],
      limit,
      offset
    });
    res.json(pharmanies);
  },
  addMedicineToPharma: async (req, res) => {
    Pharmacy.addMedicineToPharmacy([req.body.phid, req.body.mid]).then((response) => {
      res.status(response.status).send({
        status: response.status,
        message: response.message,
      });
    }).catch((error) => {
      res.status(STATUSES.SERVERERROR).send({
        status: STATUSES.SERVERERROR,
        message: error.message,
      });
    });
  }
};

export default PharmacyController;
