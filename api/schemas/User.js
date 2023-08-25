const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  salt: String,
  favourties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Estate" }],
  role: { type: String, enum: ["admin", "agente", "user"], default: "user" },
});

userSchema.pre("save", function (next) {
  const user = this;

  const passwordRegex = /^(?=.*[A-Z]).{8,}$/;

  if (!passwordRegex.test(user.password)) {
    const error = new Error(
      "La contraseña debe contener al menos una letra mayúscula y tener al menos 8 caracteres"
    );
    return next(error);
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
