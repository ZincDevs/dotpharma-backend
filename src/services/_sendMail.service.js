/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import 'regenerator-runtime';
import workerfarm from 'worker-farm';
import { sendMailWorker } from '../workers';
import { verificationTemplate, passWordResetTemplate } from '../templates';

export const sendVerificationService = (data) => {
  console.log(`PID: ${process.pid} === SENDING VERIFICATION EMAIL SERVICE STARTED===`);
  const link = `${process.env.FRONTEND_HOST}/signup/verify?token=${data.token}`;
  sendMailWorker(data, 'Account verifications', verificationTemplate(link), () => {
    workerfarm.end(sendMailWorker);
  });
};

export const sendPasswordResetConfirmationService = (data) => {
  console.log(`PID: ${process.pid} === SENDING PASSWORD RESET CONFIRMATION EMAIL SERVICE STARTED===`);
  const link = `${process.env.FRONTEND_HOST}/reset-password?token=${data.token}`;
  sendMailWorker(data, 'Password reset', passWordResetTemplate(link), () => {
    workerfarm.end(sendMailWorker);
  });
};
