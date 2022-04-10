/* eslint-disable no-unused-vars */
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import Appointment from '../database/models/Appointment';
import { STATUSES } from '../constants/ResponseStatuses';

const AppointmentController = {
  createAppointment: async (req, res) => {
    // a_id,patient_id,doctor_id,a_desease,a_date,a_status
    try{
      const data = [
        uuid(),
        req.body.patid,
        req.body.docid,
        req.body.deasese,
        moment(new Date()),
        'pending',
      ];
      const createRes = await Appointment.create(data);
      res.status(createRes.status).send({
        status: createRes.status,
        message: createRes.message,
        data: createRes.data,
      });
    }catch(e){
      res.status(STATUSES.SERVERERROR).send({
        status: STATUSES.SERVERERROR,
        message: e.message,
      });
    }
  
  },
};

export default  AppointmentController;
