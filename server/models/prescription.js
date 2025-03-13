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
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
