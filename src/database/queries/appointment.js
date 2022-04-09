export const createAppointment = `INSERT INTO appointments(a_id,patient_id,doctor_id,a_desease,a_date,a_status)
                                VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
export const getAllAppointments = 'SELECT * FROM appointments ';
export const approveAppointment = 'UPDATE appointments SET a_status=\'Approved\' WHERE a_id=$1';
export const rejectAppointment = 'UPDATE appointments SET a_status=\'Rejected\' WHERE a_id=$1';
export const deleteAppointment = 'DELETE FROM appointments WHERE a_id=$1';
