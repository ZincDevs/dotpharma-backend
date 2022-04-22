import 'regenerator-runtime';
import schema from '../schema';

schema
  .execute(
    schema.db.tables.drop.all,
    'Droped successfully!',
  );
