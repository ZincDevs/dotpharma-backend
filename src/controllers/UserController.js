/* eslint-disable no-unused-vars */
import moment from "moment";
import { v4 as uuid } from "uuid";
import User from "../database/models/User";
import { STATUSES } from "../constants/ResponseStatuses";
import {genPass} from "../utils/appUtils";

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
          res.status(400).send({
            status: 400,
            message: results,
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
    const data = [
      uuid(),
      req.body.name,
      req.body.email,
      req.body.phone,
      genPass(),
      req.body.role,
      moment(new Date()),
    ];

    User.create(data).then((results) => {
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
    }).catch((e)=>{
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
      genPass(false,req.body.password),
      req.body.role,
      moment(new Date()),
    ];
    User.create(data).then((results) => {
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
    }).catch((e)=>{
      res.status(STATUSES.SERVERERROR).send({
        status: STATUSES.SERVERERROR,
        message: e.message,
      });
    });
  },
};

export default UserController;
