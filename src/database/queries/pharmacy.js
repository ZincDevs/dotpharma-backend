/* eslint-disable max-len */
import 'regenerator-runtime';

export const createPharmacy = `INSERT INTO pharmacies 
                                (ph_id,ph_name,ph_email,ph_phone,ph_website,ph_address,ph_status,done_on,user_id)
                                VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
export const updatePharmacy = `UPDATE pharmacies 
                                SET ph_name=$1,ph_email=$2,ph_phone=$3,ph_website=$4,ph_address=$5,done_on=$6,user_id=$7 WHERE ph_id=$8
                                RETURNING *`;
export const getAllPharmacies = 'SELECT ph_id,ph_name,ph_email,ph_phone,ph_website,ph_address,done_on,user_id FROM pharmacies WHERE ph_status=\'1\'';
export const getOneById = 'SELECT ph_name,ph_email,ph_phone,ph_website,ph_address,done_on,user_id FROM pharmacies WHERE ph_id=$1';

export const searchByName = 'SELECT ph_name,ph_email,ph_phone,ph_website,ph_address,done_on,user_id FROM pharmacies WHERE ph_name LIKE \'%$1%\' AND ph_status=\'1\'';

export const deletePharmacy = 'DELETE FROM pharmacies WHERE ph_id=$1 RETURNING *';

export const disactivatePharmacy = 'UPDATE pharmacies SET ph_status=\'0\'';
export const getByEmailOrPhone = 'SELECT ph_name,ph_email,ph_phone,ph_website,ph_address,done_on,user_id FROM pharmacies WHERE ph_email=$1 OR ph_phone=$2 LIMIT 1';
export const addMedicineToPharmacy = 'INSERT INTO medicines_pharmacies(ph_id,m_id) VALUES($1,$2) RETURNING *';
export const getMedicinesInPharmacy = `SELECT ph_name,m_name,m_properties,
                                      m_desciption,m_image,m_price,m_type FROM medicines_pharmacies 
                                      INNER JOIN pharmacies ON medicines_pharmacies.ph_id=pharmacies.ph_id 
                                      INNER JOIN medicines ON medicines_pharmacies.m_id=medicines.m_id WHERE pharmacies.ph_id=$1`;
export const getpharmaciesByMedicine = `ph_name,ph_email,ph_phone,ph_website,ph_address,m_name,m_properties,
                                      m_desciption,m_image,m_price,m_type FROM medicines_pharmacies 
                                      INNER JOIN pharmacies ON medicines_pharmacies.ph_id=pharmacies.ph_id 
                                      INNER JOIN medicines ON medicines_pharmacies.m_id=medicines.m_id WHERE medicines.m_id=$1`;
