/* eslint-disable max-len */
export const createPatient = `INSERT INTO patients 
                           (p_id,p_name,p_email,p_phonenumber,p_address,p_country,p_town,p_district,p_streetnumber,p_national_id,doneon)
                           VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`;
export const getByEmail = `SELECT p_id,p_name,p_email,p_phonenumber,p_address,p_address,p_country,p_town,p_district,p_streetnumber,p_national_id 
                         FROM patients where p_email=$1`;
export const getById = `SELECT p_id,p_name,p_email,p_phonenumber,p_address,p_address,p_country,p_town,p_district,p_streetnumber,p_national_id 
                         FROM patients where p_id=$1`;
 export const getAll = `SELECT p_id,p_name,p_email,p_phonenumber,p_address,p_address,p_country,p_town,p_district,p_streetnumber,p_national_id 
                         FROM patients LIMIT $1 OFFSET $2`;
export const updatePatient = `UPDATE patients SET
                              p_name=$2,p_email=$3,p_phonenumber=$4,p_address=$5,p_country=$6,p_town=$7,p_district=$8,p_streetnumber=$9,doneon=$10 WHERE p_id=$1 RETURNING *`;
export const deletPatient = `DELETE FROM patients WHERE p_id=$1 RETURNING *`;
export const getByEmailOrPhone=`SELECT p_id,p_name,p_email,p_phonenumber,p_address,p_address,p_country,p_town,p_district,p_streetnumber,p_national_id 
FROM patients where p_email=$1 OR p_phonenumber=$2`;
