import express from "express";
import messageCtrl from "../controllers/message.controller";

const router = express.Router();

router
  .route("/messages/:passcode")
  .get(messageCtrl.get)
  .delete(messageCtrl.destroy);

router.route("/message").post(messageCtrl.create);

router.param("passcode", messageCtrl.messageByPasscode);

export default router;
