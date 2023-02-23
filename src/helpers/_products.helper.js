/* eslint-disable import/prefer-default-export */
import { Medicine } from '../db/models';

export const productList = async (productIds) => {
  const products = await Medicine.findAll({
    where: {
      m_id: productIds
    }
  });
  return products;
  // console.log(products);
};
