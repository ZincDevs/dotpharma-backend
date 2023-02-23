/* eslint-disable import/prefer-default-export */
import 'regenerator-runtime';
import {
  sendVerificationService as sendVerification,
  sendPasswordResetConfirmationService as sendPasswordResetConfirmation,
  sendOrderRequestEmail,
  sendAppointmentEmail,
  sendOrderSucccesToPatientEmail
} from './_sendMail.service';

export {
  sendVerification,
  sendPasswordResetConfirmation,
  sendOrderRequestEmail,
  sendAppointmentEmail,
  sendOrderSucccesToPatientEmail
};
