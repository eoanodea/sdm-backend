import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  hashed_passcode: {
    type: String,
    required: "Passphrase is required",
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

MessageSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_passcode;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

export default mongoose.model("Message", MessageSchema);
