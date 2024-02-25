const { createHmac, randomBytes } = await import("node:crypto");
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "this email is already in use"],
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    profileImgeURL: {
      type: String,
      default: "/images/user-avatar.png",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) return;
    const salt = randomBytes(256).toString();
    const hashedPassword = createHmac("sha256", salt)
      .update(user.password)
      .digest("hex");
    user.password = hashedPassword;
    user.salt = hashedPassword;
    next();
  } catch (error) {
    console.log(`[ERROR]: ${error.message}`);
  }
});

const User = mongoose.model("users", userSchema);

export default User;
