export const createAppointment = `INSERT INTO appointments(a_id,patient_id,doctor_id,a_desease,a_date,a_status)
                                VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;
export const getAllAppointments = `SELECT * FROM appointments INNER JOIN patients on appointments.patient_id=patients.p_id 
                                INNER JOIN doctors on appointments.doctor_id=doctors.do_id LIMIT $1 OFFSET $2`;
export const approveAppointment = `UPDATE appointments SET a_status='Approved' WHERE a_id=$1 RETURNING *`;
export const rejectAppointment = `UPDATE appointments SET a_status='Rejected' WHERE a_id=$1 RETURNING *`;
export const deleteAppointment = `DELETE FROM appointments WHERE a_id=$1 RETURNING *`;
export const getApprovedAppointments = `SELECT * FROM appointments INNER JOIN patients on appointments.patient_id=patients.p_id 
                                INNER JOIN doctors on appointments.doctor_id=doctors.do_id WHERE a_status='Approved' LIMIT $1 OFFSET $2`;
export const getRejectedAppointments = `SELECT * FROM appointments INNER JOIN patients on appointments.patient_id=patients.p_id 
                                INNER JOIN doctors on appointments.doctor_id=doctors.do_id WHERE a_status='Rejected' LIMIT $1 OFFSET $2`;
export const getAllAppointmentsByDoctor = `SELECT * FROM appointments INNER JOIN patients on appointments.patient_id=patients.p_id 
                                INNER JOIN doctors on appointments.doctor_id=doctors.do_id where doctors.do_id=$1 LIMIT $2 OFFSET $3`;
export const getApprovedAppointmentsByDoctor = `SELECT * FROM appointments INNER JOIN patients on appointments.patient_id=patients.p_id 
                                INNER JOIN doctors on appointments.doctor_id=doctors.do_id WHERE a_status='Approved' AND doctors.do_id=$1 LIMIT $2 OFFSET $2`;
export const getRejectedAppointmentsByDoctor = `SELECT * FROM appointments INNER JOIN patients on appointments.patient_id=patients.p_id 
                                INNER JOIN doctors on appointments.doctor_id=doctors.do_id WHERE a_status='Rejected' WHERE a_status='Approved' AND doctors.do_id=$1 LIMIT $2 OFFSET $2`;