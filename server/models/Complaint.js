import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Maintenance', 'Cleanliness', 'Food', 'Security', 'Electricity', 'Water', 'Other'],
    required: true 
  },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' },
  raisedBy: { type: String, required: true },
  roomNo: { type: String },
  resolvedAt: { type: Date },
  adminNote: { type: String },
}, { timestamps: true });

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;