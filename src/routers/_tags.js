import 'regenerator-runtime';
import express from 'express';

import Tag from '../controllers/Tags';
import Auth from '../middleware/Auth';
import User from '../middleware/user';

const router = express.Router();

router.post(
  '/createnew',
  Tag.create
);

router.put(
  '/updatetip/:id',
  Tag.update
);
router.get(
  '/getall',
  Tag.findAll
);
router.get(
  '/findone/:id',
  Tag.findById
);
router.delete(
  '/deletetag/:id',
  Auth.verifyToken,
  User.checkISAdmin,
  Tag.delete
);

export default router;
