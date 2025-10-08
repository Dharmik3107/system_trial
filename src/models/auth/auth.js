// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: Number,
      enum: [0, 1, 2, 3, 4], // ✅ you can add or change roles
      default: "3",
    },
    createdBy: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    isNewEmployee: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "employees", // 👈 custom collection name
  }
);

// Hash password before save (only when modified/new)
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to compare password
employeeSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
export default Employee;
