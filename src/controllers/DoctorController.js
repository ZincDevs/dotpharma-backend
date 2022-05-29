/* eslint-disable camelcase */
import 'regenerator-runtime';
import { Doctor } from '../db/models';

const DoctorController = {
  updateDoctor: async (req, res) => {
    const data = {
      d_name: req.body.name,
      d_email: req.body.email,
      d_phone: req.body.phone,
      d_speciality: req.body.speciality,
      d_clinic: req.body.clinic,
      d_image: req.body.image,
      u_id: req.authUser.u_id,
      creator: req.authUser.u_id
    };
    const { d_id } = req.params;

    const doctor = await Doctor.update(data, { where: { d_id } });
    if (doctor[0] === 0) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  },
  findAll: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const doctors = await Doctor.findAll({
      limit,
      offset
    });
    return res.json(doctors);
  },
  deleteDoctor: async (req, res) => {
    const { m_id } = req.params;
    const doctor = await Doctor.findOne({ where: { m_id } });
    if (!doctor) {
      return res.sendStatus(400);
    }
    await doctor.destroy();
    return res.sendStatus(200);
  },
};

export default DoctorController;
