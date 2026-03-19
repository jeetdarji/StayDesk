import express from 'express';
const router = express.Router();
import Complaint from '../models/Complaint.js';
import { protect } from '../middleware/authMiddleware.js';

// Get all complaints
router.get('/', protect, async (req, res) => {
  try {
    const complaints = await Complaint.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new complaint
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, category, priority, roomNo } = req.body;
    
    if (!title || !description || !category) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const complaint = new Complaint({
      title,
      description,
      category,
      priority,
      roomNo,
      raisedBy: req.user.name || 'Student',
    });

    const createdComplaint = await complaint.save();
    res.status(201).json({ success: true, data: createdComplaint, message: "Complaint raised successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update complaint
router.put('/:id', protect, async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (complaint) {
      if (status) complaint.status = status;
      if (adminNote) complaint.adminNote = adminNote;
      
      if (status === 'Resolved' || status === 'Closed') {
        if (!complaint.resolvedAt) {
          complaint.resolvedAt = Date.now();
        }
      }

      const updatedComplaint = await complaint.save();
      res.json({ success: true, data: updatedComplaint, message: "Complaint updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Complaint not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete complaint
router.delete('/:id', protect, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (complaint) {
      await complaint.remove();
      res.json({ success: true, message: "Complaint removed" });
    } else {
      res.status(404).json({ success: false, message: "Complaint not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get stats
router.get('/stats', protect, async (req, res) => {
  try {
    const stats = await Complaint.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;