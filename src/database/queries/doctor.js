/* eslint-disable max-len */
import 'regenerator-runtime';

export const createDoctor = `INSERT INTO doctors
(do_id,d_name,d_email,d_phone,d_speciality,d_clinic,d_image,d_status,d_doneon,user_id,user_ref)
VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`;
export const updateDoctor = `UPDATE doctors
SET d_name=$1,d_email=$2,d_speciality=$3,d_clinic=$4,d_image=$5,d_doneon=$6,user_id=$7,d_phone=$8 WHERE do_id=$9
RETURNING *`;
export const getAllDoctors = 'SELECT do_id,d_name,d_email,d_speciality,d_clinic,d_image,d_doneon,user_id FROM doctors WHERE d_status=\'1\'';
export const getByEmailOrPhone = 'SELECT do_id,d_name,d_email,d_phone FROM doctors WHERE d_email=$1 OR d_phone=$2 LIMIT 1';
export const deleteDoctor = 'DELETE from doctors where do_id=$1 RETURNING *';
export const desactivateDoctor = 'UPDATE doctors SET d_status=\'0\' where do_id=$1';
export const getDoctorById = 'SELECT do_id,d_name,d_email,d_speciality,d_clinic,d_image,d_doneon,user_id FROM doctors WHERE d_status=\'1\' AND do_id=$1';
