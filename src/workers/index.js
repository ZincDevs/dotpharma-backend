/* eslint-disable import/prefer-default-export */
import workerfarm from 'worker-farm';

export const sendMailWorker = workerfarm(require.resolve('./_sendMail'));
