import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  roomNo: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  status: { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Pending' },
  paidOn: { type: Date },
  paymentMode: { type: String, enum: ['Cash', 'UPI', 'Bank Transfer', 'Other'] },
  receiptNo: { type: String },
}, { timestamps: true });

const Fee = mongoose.model('Fee', feeSchema);
export default Fee;
