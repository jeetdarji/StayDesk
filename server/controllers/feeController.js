import asyncHandler from "express-async-handler";
import Fee from "../models/Fee.js";

// @desc    Get all fees
// @route   GET /api/fees
// @access  Private/Admin
const getFees = asyncHandler(async (req, res) => {
  const fees = await Fee.find({});
  res.json({ success: true, data: fees });
});

// @desc    Create new fee record
// @route   POST /api/fees
// @access  Private/Admin
const createFee = asyncHandler(async (req, res) => {
  const { studentName, roomNo, amount, month, year, status } = req.body;

  if (!studentName || !roomNo || !amount || !month || !year) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const fee = await Fee.create({
    studentName,
    roomNo,
    amount,
    month,
    year,
    status: status || 'Pending',
  });

  res.status(201).json({ success: true, data: fee, message: "Fee record created successfully" });
});

// @desc    Update fee status to Paid
// @route   PUT /api/fees/:id
// @access  Private/Admin
const updateFeeStatus = asyncHandler(async (req, res) => {
  const { status, paymentMode, receiptNo, paidOn } = req.body;

  const fee = await Fee.findById(req.params.id);

  if (fee) {
    fee.status = status;
    fee.paymentMode = paymentMode;
    fee.receiptNo = receiptNo;
    fee.paidOn = paidOn || Date.now();

    const updatedFee = await fee.save();
    res.json({ success: true, data: updatedFee, message: "Fee marked as paid" });
  } else {
    res.status(404);
    throw new Error("Fee record not found");
  }
});

export { getFees, createFee, updateFeeStatus };
