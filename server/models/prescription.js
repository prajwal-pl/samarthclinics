import mongoose from "mongoose";

const Schema = mongoose.Schema;

const prescriptionSchema = new Schema(
  {
    prescriptionText: {
      type: String,
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateIssued: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
    expiryDate: {
      type: Date,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    paymentDate: {
      type: Date,
    },
    paymentAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
