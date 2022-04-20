/* eslint-disable import/prefer-default-export */
import workerfarm from 'worker-farm';
import { sendMailWorker } from '../workers';
import { verificationTemplate } from '../templates';

export const sendVerificationService = (data) => {
  const link = `https://dotpharma.herokuapp.com/verify?token=${data.token}`;
  sendMailWorker(data, 'Account verifications', verificationTemplate(link), () => {
    workerfarm.end(sendMailWorker);
  });
};
