/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import { v4 as uuid } from 'uuid';
import { Clinic } from '../db/models';

const ClinicsController = {
  createClinic: async (req, res) => {
    const data = {
      c_id: uuid(),
      c_name: req.body.cname,
      c_email: req.body.cemail,
      c_phonenumber: req.body.cphone,
      c_logo: req.body.clogo,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createClinic = await Clinic.create(data);
    if (!createClinic) return res.sendStatus(500);
    return res.sendStatus(201);
  },
  findAll: async (req, res) => {
    const { paginate } = req;
    // const limit = paginate?.limit;
    // const offset = paginate?.offset;
    const clinics = await Clinic.findAll();
    return res.json(clinics);
  },
};

export default ClinicsController;
