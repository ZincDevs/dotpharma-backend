export const createOrder = `INSERT INTO orders
                         (o_id,patient_id,o_pharmacy,o_medicine,o_date,o_status)
                         VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
export const updateOrder = `UPDATE orders SET patient_id=$1,
                          o_pharmacy=$2,o_medicine=$3,o_prescription=$4,o_date=$5 WHERE o_id=$6 RETURNING *`;
export const approveOrder = 'UPDATE orders SET o_status=\'Approved\' WHERE o_id=$1 RETURNING *';
export const rejectOrder = 'UPDATE orders SET o_status=\'Rejected\' WHERE o_id=$1 RETURNING *';
export const deleteOrder = 'DELETE FROM orders WHERE o_id=$1 RETURNING *';
export const getAllOrders = `SELECT o_id,ph_name,ph_email,ph_phone,ph_address,p_name,p_email,p_phonenumber,p_address,
p_country,p_town,p_district,p_streetnumber,m_name,m_properties,m_desciption,m_image,m_price,m_type,o_date FROM orders
INNER JOIN pharmacies ON orders.o_pharmacy=pharmacies.ph_id INNER JOIN patients ON orders.patient_id=patients.p_id
INNER JOIN medicines ON orders.o_medicine=medicines.m_id LIMIT $1 OFFSET $2`;
export const getApprovedOrders = `SELECT o_id,ph_name,ph_email,ph_phone,ph_address,p_name,p_email,p_phonenumber,p_address,
p_country,p_town,p_district,p_streetnumber,m_name,m_properties,m_desciption,m_image,m_price,m_type,o_date FROM orders
INNER JOIN pharmacies ON orders.o_pharmacy=pharmacies.ph_id INNER JOIN patients ON orders.patient_id=patients.p_id
INNER JOIN medicines ON orders.o_medicine=medicines.m_id WHERE orders.o_status='Approved' LIMIT $1 OFFSET $2`;
export const getRejectedOrders = `SELECT o_id,ph_name,ph_email,ph_phone,ph_address,p_name,p_email,p_phonenumber,p_address,
p_country,p_town,p_district,p_streetnumber,m_name,m_properties,m_desciption,m_image,m_price,m_type,o_date FROM orders
INNER JOIN pharmacies ON orders.o_pharmacy=pharmacies.ph_id INNER JOIN patients ON orders.patient_id=patients.p_id
INNER JOIN medicines ON orders.o_medicine=medicines.m_id WHERE orders.o_status='Rejected' LIMIT $1 OFFSET $2`;
