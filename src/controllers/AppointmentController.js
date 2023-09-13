/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import { v4 as uuid } from 'uuid';
import dotev from 'dotenv';
import { Appointment } from '../db/models';
import { sendAppointmentEmail } from '../services';
import { sendSms } from '../helpers/_sendSMS';

dotev.config();

const AppointmentController = {
  createAppointment: async (req, res) => {
    const data = {
      a_id: uuid(),
      p_id: req.body.patid,
      d_id: req.body.docid,
      a_desease: req.body.deasese,
      a_type: req.body.atype,
      a_date: req.body.adate,
      cl_id: req.body.clid,
      p_phone: req.body.phone,
      p_email: req.body.email,
      p_name: req.body.name,
      a_status: 'pending',
    };
    const appointment = await Appointment.create(data);
    if (!appointment) return res.sendStatus(500);

    sendAppointmentEmail({
      email: process.env.DOTPHARMA_EMAL_FORWARD_TO,
      appointment: appointment.a_id,
      name: req.body.name,
      phonenumber: req.body.phone
    });
    await sendSms({
      sender: 'Dotpharma',
      body: `${req.body.name} with phone number ${req.body.phone}, has made a ${req.body.atype}. Check in dashboard.`
    });
    return res.sendStatus(201);
  },
  findAll: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const appointments = await Appointment.findAll({
      limit,
      offset
    });
    return res.json(appointments);
  },
  findDoctorAppointment: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const { d_id } = req.params;
    const appointments = await Appointment.findAll({
      limit,
      offset,
      where: { d_id }
    });
    return res.json(appointments);
  },
  findApproved: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const a_status = 'approved';
    const appointments = await Appointment.findAll({
      limit,
      offset,
      where: { a_status }
    });
    return res.json(appointments);
  },
  findRejected: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const a_status = 'rejected';
    const appointments = await Appointment.findAll({
      limit,
      offset,
      where: { a_status }
    });
    return res.json(appointments);
  },
  reject: async (req, res) => {
    const payload = {
      a_status: 'rejected'
    };
    const { a_id } = req.params;
    const appointment = await Appointment.update(payload, { where: { a_id } });
    if (appointment[0] === 0) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  },
  approve: async (req, res) => {
    const payload = {
      a_status: 'approved'
    };
    const { a_id } = req.params;
    const appointment = await Appointment.update(payload, { where: { a_id } });
    if (appointment[0] === 0) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  },
};

export default AppointmentController;
