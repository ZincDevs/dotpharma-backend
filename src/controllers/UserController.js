/* eslint-disable no-unused-vars */
import moment from "moment";
import { v4 as uuid } from "uuid";
import User from "../database/models/User";
import { STATUSES } from "../constants/ResponseStatuses";
import { genPass } from "../utils/appUtils";
import { MESSAGES } from "../constants/ResponceMessages";
import { sendEmail } from "../utils/appUtils";

const UserController = {
  login: async (req, res) => {
    const data = [req.body.email, req.body.password];
    User.login(data)
      .then((results) => {
        if (results.user) {
          res.status(200).send({
            token: results.token,
            status: 200,
            message: results.message,
            user: results.user.rows,
          });
        } else {
          res.status(401).send({
            status: 401,
            ...results
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err,
        });
      });
  },
  createUser: async (req, res) => {
    const pass= genPass();
    console.log(pass)
    const data = [
      uuid(),
      req.body.name,
      req.body.email,
      req.body.phone,
     pass,
      req.body.role,
      moment(new Date()),
    ];

    User.create(data)
      .then((results) => {
        if (results.user) {
          res.status(STATUSES.CREATED).send({
            token: results.token,
            status: STATUSES.CREATED,
            user: results.user.rows,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: results.message,
          });
        }
      })
      .catch((e) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: e.message,
        });
      });
  },
  signup: async (req, res) => {
    const data = [
      uuid(),
      req.body.name,
      req.body.email,
      req.body.phone,
      genPass(false, req.body.password),
      req.body.role,
      moment(new Date()),
    ];
    User.create(data)
      .then((results) => {
        if (results.user) {
          res.status(STATUSES.CREATED).send({
            token: results.token,
            status: STATUSES.CREATED,
            user: results.user.rows,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: results.message,
          });
        }
      })
      .catch((e) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: e.message,
        });
      });
  },
  findAll: async (req, res) => {
    const data = [req.query.page ? req.query.page : 1, 20];
    User.findAll(data)
      .then((results) => {
        if (results.users) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            users: results.users,
          });
        } else {
          res.status(STATUSES.NO_CONTENT).send({
            status: STATUSES.NO_CONTENT,
            message: MESSAGES.NOT_CONTENT,
          });
        }
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
        });
      });
  },
  update: async (req, res) => {
    const data = [
      req.params.uid,
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.role,
      moment(new Date()),
    ];
    User.update(data)
      .then((results) => {
        if (results.user) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            user: results.user.rows,
            message: results.message,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: results.message,
          });
        }
      })
      .catch((e) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: e.message,
        });
      });
  },
  destroy: async (req, res) => {
    User.destroy(req.params.uid)
      .then((results) => {
        if (results.user) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: results.message,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: results.message,
          });
        }
      })
      .catch((e) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: e.message,
        });
      });
  },
  resetPassword: async (req, res) => {
    const data = [req.body.uid, req.body.oldpassword, req.body.newpassword];
    User.resetPassword(data)
      .then((results) => {
        if (results.user) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: results.message,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: results.message,
          });
        }
      })
      .catch((e) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: e.message,
        });
      });
  },
};

export default UserController;
