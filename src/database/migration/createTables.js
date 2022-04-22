import 'regenerator-runtime';
import schema from '../schema';

schema
  .execute(
    schema.db.tables.create.all,
    'Created successfully!',
  );
