/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import 'regenerator-runtime';
import workerfarm from 'worker-farm';
import { sendMailWorker } from '../workers';
import {
  verificationTemplate, passWordResetTemplate, orderRequesTemplate, appoimentRequestTemplate
} from '../templates';

export const sendVerificationService = (data) => {
  console.log(`PID: ${process.pid} === SENDING VERIFICATION EMAIL SERVICE STARTED===`);
  const link = `${process.env.FRONTEND_HOST_LOCAL ? process.env.FRONTEND_HOST_LOCAL : process.env.FRONTEND_HOST}/verify?session=${data.token}`;
  sendMailWorker(data, 'Account verifications', verificationTemplate(link), () => {
    workerfarm.end(sendMailWorker);
  });
};

export const sendPasswordResetConfirmationService = (data) => {
  console.log(`PID: ${process.pid} === SENDING PASSWORD RESET CONFIRMATION EMAIL SERVICE STARTED===`);
  const link = `${process.env.FRONTEND_HOST_LOCAL ? process.env.FRONTEND_HOST_LOCAL : process.env.FRONTEND_HOST}/reset-password?session=${data.token}`;
  sendMailWorker(data, 'Password reset', passWordResetTemplate(link), () => {
    workerfarm.end(sendMailWorker);
  });
};

export const sendOrderRequestEmail = (data) => {
  console.log(`PID: ${process.pid} === SENDING PASSWORD RESET CONFIRMATION EMAIL SERVICE STARTED===`);
  const link = `${process.env.FRONTEND_HOST_LOCAL ? process.env.FRONTEND_HOST_LOCAL : process.env.FRONTEND_HOST}/admin/orders/${data.orderid}`;
  sendMailWorker(data, 'Order request ', orderRequesTemplate(link, data.name, data.phonenumber), () => {
    workerfarm.end(sendMailWorker);
  });
};

export const sendAppointmentEmail = (data) => {
  console.log(`PID: ${process.pid} === SENDING APPOINTMENT EMAIL SERVICE STARTED===`);
  const link = `${process.env.FRONTEND_HOST_LOCAL ? process.env.FRONTEND_HOST_LOCAL : process.env.FRONTEND_HOST_LOCAL}/admin/appointments/${data.appointment}`;
  sendMailWorker(data, 'Appointment request', appoimentRequestTemplate(link, data.name, data.phonenumber), () => {
    workerfarm.end(sendMailWorker);
  });
};
