import 'regenerator-runtime';
import { Tags } from '../db/models';

const TagsController = {
  create: async (req, res) => {
    const data = {
      name: req.body.name,
    };
    const healthTip = await Tags.create(data);
    if (!healthTip) return res.sendStatus(500);
    return res.sendStatus(201);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const data = {
      name: req.body.name,
    };
    const tag = await Tags.update(data, { where: { id } });
    if (tag[0] === 0) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const tag = await Tags.findOne({ where: { id } });
    if (!tag) {
      return res.sendStatus(400);
    }
    await tag.destroy();
    return res.sendStatus(200);
  },
  findAll: async (req, res) => {
    const tags = await Tags.findAll();
    return res.json(tags);
  },
  findById: async (req, res) => {
    const { id } = req.params;
    let tag = await Tags.findOne({ where: { id } });
    tag = Tags?.dataValues;
    if (!tag) {
      return res.sendStatus(204);
    }
    return res.json(tag);
  },
};

export default TagsController;
