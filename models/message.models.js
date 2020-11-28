import mongoose from "mongoose";
import crypto from "crypto";

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  hashed_password: {
    type: String,
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
});
/**
 * Encrypt the password
 * And make the salt
 */
MessageSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * Validate the submitted password by the user
 */
MessageSchema.path("hashed_password").validate(function () {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

/**
 * Declaring methods for the User Schema
 */

MessageSchema.methods = {
  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword(password) {
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
  makeSalt() {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};
export default mongoose.model("Message", MessageSchema);
