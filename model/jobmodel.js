const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
    unique: true,
  },
  productData: [
    {
      productName: String,
      inputImageUrls: [String],
      outputImageUrls: [String],
    },
  ],
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Job', JobSchema);