/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import { v4 as uuid } from 'uuid';
import { Op } from 'sequelize';
import { Clinic, ClinicInsurance, Insurances } from '../db/models';

const ClinicsController = {
  createClinic: async (req, res) => {
    const data = {
      c_id: uuid(),
      c_name: req.body.cname,
      c_email: req.body.cemail,
      c_phonenumber: req.body.cphone,
      c_logo: req.body.clogo,
      specialized: req.body.specialized,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const clinic = await Clinic.create(data);
    if (!clinic) return res.sendStatus(500);
    return res.status(201).send(clinic);
  },
  findAll: async (req, res) => {
    const clinics = await Clinic.findAll();
    return res.json(clinics);
  },
  updatePharmacy: async (req, res) => {
    const payload = {
      c_name: req.body.name,
      c_email: req.body.email,
      c_phonenumber: req.body.phone,
      specialized: req.body.specialized,
      c_logo: req.body.logo,
    };
    const { c_id } = req.params;

    const clinic = await Clinic.update(payload, { where: { c_id } });
    if (clinic[0] === 0) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  },
  deletePharmacy: async (req, res) => {
    const { c_id } = req.params;
    const clinic = await Clinic.findOne({ where: { c_id } });
    if (!clinic) {
      return res.sendStatus(400);
    }
    await clinic.destroy();
    return res.sendStatus(200);
  },

  createInurance: async (req, res) => {
    const { c_id, i_id } = req.body;
    const clinicInsurance = await ClinicInsurance.findOne({ where: { ClinicId: c_id, InsuranceId: i_id } });
    console.log(clinicInsurance);
    if (clinicInsurance) {
      return res.status(400).json({ error: 'Insurance already exists!' });
    }
    const clinicRes = await ClinicInsurance.create({
      ClinicId: c_id,
      InsuranceId: i_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    if (!clinicRes) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  },
  findClinicInsurances: async (req, res) => {
    const { cid } = req.params;

    const insurancesIds = await ClinicInsurance.findAll({ where: { ClinicId: cid } });
    const insuransesIdsFilter = insurancesIds?.map((ins) => ins.dataValues.InsuranceId);
    const insurances = await Insurances.findAll({
      where: {
        id: {
          [Op.in]: insuransesIdsFilter
        }
      }
    });
    if (!insurances) {
      return res.sendStatus(400);
    }
    return res.json(insurances);
  },
  findAllInsurances: async (req, res) => {
    const insurances = await Insurances.findAll();
    if (!insurances) {
      return res.sendStatus(400);
    }
    return res.json(insurances);
  }
};

export default ClinicsController;
