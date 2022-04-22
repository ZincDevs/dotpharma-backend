import 'regenerator-runtime';

export const createHealthTip=`INSERT INTO healthtips(h_id,h_title,h_image,h_category,h_description,h_doneon,u_id)
                               VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
export const upadateHealthTip=`UPDATE healthtips SET h_title=$2,h_image=$3,h_category=$4,h_doneon=$5,u_id=$6,h_description=$7
                               WHERE h_id=$1 RETURNING *`;
export const findAllTip=`SELECT * FROM healthtips LIMIT $1 OFFSET $2`;
export const findById=`SELECT * FROM healthtips WHERE h_id=$1`;
export const deleteTip=`DELETE FROM healthtips  WHERE h_id=$1 RETURNING *`;