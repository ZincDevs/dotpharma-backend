/* eslint-disable import/prefer-default-export */
import workerfarm from 'worker-farm';

export const sendVerification = workerfarm(require.resolve('./_sendVerificationMail'));