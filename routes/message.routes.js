import express from "express";
import messageCtrl from "../controllers/message.controller";

const router = express.Router();

router
  .route("/messages/:passcode")
  .get(messageCtrl.get)
  .delete(messageCtrl.delete);

router.param("passcode", messageCtrl.messageByPasscode);

export default router;