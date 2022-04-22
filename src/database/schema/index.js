/* eslint-disable no-console */
/* eslint-disable no-shadow */
import 'regenerator-runtime';
import connection from '../connection';
import schemaConfig from './_config';

const con = connection();
export default {
  db: schemaConfig,
  execute: async (migrations, message) => {
    await con.query(migrations[0].query);
    await con.query(migrations[1].query);
    await con.query(migrations[2].query);
    await con.query(migrations[3].query);
    await con.query(migrations[4].query);
    await con.query(migrations[5].query);
    await con.query(migrations[6].query);
    await con.query(migrations[7].query);
    await con.query(migrations[8].query);
    migrations.forEach(({ name }) => {
      console.log(`${name} ${message}`);
    });
  }
};
