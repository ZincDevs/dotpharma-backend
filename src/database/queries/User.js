/* eslint-disable no-tabs */
/* eslint-disable max-len */
export const getAll = `SELECT u_id, u_name, u_email, u_phone, u_role,doneon
FROM users LIMIT $1 OFFSET $2`;
export const getByEmail = 'select u_id, u_name, u_email, u_phone, u_role,u_password,doneon from users where u_email =$1';
export const getByRole = 'select userid,names,email,phonenumber,role,password,status from users where role = \'TEACHER\' and status = \'1\'';
export const getById = `SELECT u_id, u_name, u_email, u_phone, u_role,u_password,doneon FROM users where u_id = $1`;
export const getByEmailOrPhone = 'select u_id, u_name, u_email, u_phone, u_role,u_password,doneon from users where u_email =$1 or u_phone=$2';

export const create = `INSERT INTO users(
	u_id, u_name, u_email, u_phone, u_password, u_role, doneon)
	VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;

export const update = `UPDATE users
	SET u_name=$2, u_email=$3, u_phone=$4, u_role=$5, doneon=$6
	WHERE u_id = $1 returning *`;

export const updatePassword = 'UPDATE users SET u_password=$2 WHERE u_id = $1 RETURNING *';

export const deleteuser = 'delete from users where u_id =$1 RETURNING *';

export const checkExist = 'select * from users where u_email = $1 OR u_phone=$2';
