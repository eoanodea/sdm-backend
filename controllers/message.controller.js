import _ from "lodash";
import Message from "../models/message.models";

const create = (req, res) => {
  const message = new Message(req.body);

  message.save((err, result) => {
    if (err) {
      return res.status("400").json({
        error: err,
        success: false,
      });
    }

    return res.status(200).json({ success: true });
  });
};

const messageByPasscode = (req, res, next) => {
  const { passcode } = req.params;

  Message.find({}).exec((err, messages) => {
    if (err) {
      return res.status("400").json({
        error: err,
        success: false,
      });
    }
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      const encrypedPasscode = message.encryptPassword(passcode);

      if (encrypedPasscode === message.hashed_password) {
        req.message = {
          _id: message._id,
          message: message.message,
        };
        return next();
      }
      break;
    }

    return res.status("400").json({
      error: "Not Found",
      success: false,
    });
  });
};

const get = (req, res) => res.json({ success: true, message: req.message });

const destroy = async (req, res, next) => {
  const { message } = req;

  Message.deleteOne({ _id: message._id }).exec((err) => {
    if (err)
      return res.status(400).json({
        error: err,
        success: false,
      });

    return res.status(200).json({ success: true });
  });
};

export default { create, messageByPasscode, get, destroy };
