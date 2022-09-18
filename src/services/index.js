/* eslint-disable import/prefer-default-export */
import 'regenerator-runtime';
import {
  sendVerificationService as sendVerification,
  sendPasswordResetConfirmationService as sendPasswordResetConfirmation,
  sendOrderRequestEmail,
  sendAppointmentEmail,
} from './_sendMail.service';

export {
  sendVerification,
  sendPasswordResetConfirmation,
  sendOrderRequestEmail,
  sendAppointmentEmail
};
