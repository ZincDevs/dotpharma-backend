/* eslint-disable max-len */
import 'regenerator-runtime';

export const createMedicine = `INSERT INTO 
                             medicines (m_id,m_name,m_properties,m_desciption,m_image,m_price,m_status,m_type,m_doneon,u_id)
                             VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`;
export const updateMedicine = `UPDATE medicines SET 
                              m_name=$1,m_properties=$2,m_desciption=$3,m_image=$4,m_price=$5,m_type=$6,m_doneon=$7,u_id=$8
                              WHERE m_id=$9 RETURNING *`;
export const findAllMedicines = 'SELECT m_id,m_name,m_properties,m_desciption,m_image,m_price,m_status,m_type,m_doneon,u_id FROM medicines WHERE m_status=\'1\'';
export const getById = 'SELECT m_id,m_name,m_properties,m_desciption,m_image,m_price,m_status,m_type,m_doneon,u_id FROM medicines WHERE m_status=\'1\' AND m_id=$1';
export const searchByName = 'SELECT m_id,m_name,m_properties,m_desciption,m_image,m_price,m_status,m_type,m_doneon,u_id FROM medicines WHERE m_status=\'1\' AND m_name LIKE %$1%';
export const deleteMedicine = 'DELETE FROM medicines WHERE m_id=$1 RETURNING *';
