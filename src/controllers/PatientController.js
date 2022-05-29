/* eslint-disable camelcase */
import 'regenerator-runtime';
import { Patient } from '../db/models';

const PatientController = {
  update: async (req, res) => {
    const patientPayload = {
      p_name: req.body.name,
      p_email: req.body.email,
      p_phonenumber: req.body.phone,
      p_address: req.body.address,
      p_country: req.body.country,
      p_town: req.body.town,
      p_district: req.body.city,
      p_streetnumber: req.body.street,
      p_national_id: req.body.nid,
    };
    const { p_id } = req.params;
    const patient = await Patient.update(patientPayload, { where: { p_id } });
    if (patient[0] === 0) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  },
  findAll: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const patients = await Patient.findAll({
      limit,
      offset
    });
    res.json(patients);
  },
  deletePatient: async (req, res) => {
    const { p_id } = req.params;
    const patient = await Patient.findOne({ where: { p_id } });
    if (!patient) {
      return res.sendStatus(400);
    }
    await patient.destroy();
    return res.sendStatus(200);
  },
  findById: async (req, res) => {
    const { p_id } = req.params;
    const patient = await Patient.findOne({ where: { p_id } });
    if (!patient) {
      return res.sendStatus(400);
    }
    return res.json(patient);
  },
};

export default PatientController;
