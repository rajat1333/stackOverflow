"use strict";
import express from "express";
const router = express.Router();
import Users from "../../models/UserModel.js";
import connPool from "../../Utils/mysql.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {checkAuth} from "../../Utils/passport.js";
let jwt_secret = "cmpe273_secret_key";

router.post("/register", async function (req, res) {
  console.log("Inside Register Post Request");
  console.log(req.body);

  const salt = await bcrypt.genSalt(10);
  const encPassword = await bcrypt.hash(req.body.password, salt);
  let hash_password = encPassword;

  var sql = "INSERT INTO USERS (email, password, displayName) VALUES ?";
  var values = [[req.body.email, hash_password, req.body.displayName]];
  connPool.query(sql, [values], function (err, result) {
    console.log("querry executed and result is : ");
    if (err || result.length === 0) {
      console.log("Error occured is : " + err);
      return;
    } else {
      const user = new Users({
        emailID: req.body.email,
        displayName: req.body.displayName,
      });

      user.save(function (error) {
        if (error) {
          return;
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json",
            "mongo_id": user._id
          });
          res.end("Register Successful");
        }
      });
    }
  });
});

router.post("/login", async function (req, res) {
  console.log("Inside Login Post Request");
  console.log(req.body);

  var sql = "SELECT * FROM USERS WHERE email = ?";
  var values = [[req.body.email]];
  connPool.query(sql, [values], async function (err, user) {
    console.log("querry executed and result is : ");
    if (err || user.length === 0) {
      console.log("Error occured is : " + err);
      res.status(200).send("Email not registered");
    } else {
      if (user) {
        const result = Object.values(JSON.parse(JSON.stringify(user)));
        const validPassword = await bcrypt.compare(
          req.body.password,
          result[0].password
        );

        if (validPassword) {
          const payload = {
            _id: result[0].id_USERS,
            email: result[0].email,
            displayName: result[0].displayName,
          };
          const token = jwt.sign(payload, jwt_secret, {
            expiresIn: 1008000,
          });

          Users.findOne({ emailID: req.body.email }, (err, user) => {
            if (err) {
              res.send({ err: err });
            } else {
              if (!user.isAdmin) {
                user.isAdmin = false;
              }
              res
                .status(200)
                .send({
                  jwt: "JWT " + token,
                  userID: user._id,
                  isAdmin: user.isAdmin,
                  userName: user.displayName,
                });
            }
          });
        } else {
          res.status(200).send("Login failed");
        }
      } else {
        res.status(200).send("Email not registered");
      }
    }
  });
});

router.post("/logout", function (req, res) {
  console.log("Inside logout Post Request");
  const authHeader = req.headers["authorization"];
  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.status(200).send({ msg: "You have been Logged Out" });
    } else {
      res.send({ msg: "Error" });
    }
  });
});

export default router;
