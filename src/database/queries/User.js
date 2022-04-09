/* eslint-disable no-tabs */
/* eslint-disable max-len */
export const getAll = `SELECT userid,names, email, phonenumber, role, password, status
FROM users where status='1' and role !='HEAD_MASTER' LIMIT 20 OFFSET $1`;
export const getByEmail = 'select u_id, u_name, u_email, u_phone, u_role,u_password,doneon from users where u_email =$1';
export const getByRole = 'select userid,names,email,phonenumber,role,password,status from users where role = \'TEACHER\' and status = \'1\'';
export const getById = `SELECT userid,names, email, phonenumber, role, password, status
FROM users where status='1' and userid = $1`;
export const getByEmailOrPhone = 'select u_id, u_name, u_email, u_phone, u_role,u_password,doneon from users where u_email =$1 or u_phone=$2';
export const getTotalUsers = 'SELECT COUNT(*) as totalUses from users where';

export const create = `INSERT INTO users(
	u_id, u_name, u_email, u_phone, u_password, u_role, doneon)
	VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;

export const update = `UPDATE users
	SET names=$2, email=$3, phonenumber=$4, role=$5
	WHERE userid = $1 returning *`;
export const updatePassword = 'UPDATE users SET password=$2 WHERE userid = $1';
export const hideuser = `UPDATE users
	SET status='0'
	WHERE userid = $1`;
export const deleteuser = 'delete from users where userid =$1';

export const checkExist = 'select * from users where u_email = $1 OR u_phone=$2';

export const searchUser = `select userid,names, email, phonenumber, role, password, status
	 from users where position(LOWER($1) in LOWER(names))>0 and status = '1'`;
