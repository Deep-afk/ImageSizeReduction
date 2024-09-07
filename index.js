const express = require('express');
const multer = require('multer');
const connectDB = require('./config/db');
const { parseCSV } = require('./utils/validate');
const { createJob } = require('./utils/jobqueue');
const Job = require('./model/jobmodel');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  console.log("file",file);
  try {
    const csvData = await parseCSV(file.path);
    console.log("csv data",csvData);
    const requestId = await createJob(csvData);
    res.status(200).json({ requestId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/status/:requestId', async (req, res) => {
  const { requestId } = req.params;
  try {
    const job = await Job.findOne({ requestId });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({
      requestId: job.requestId,
      status: job.status,
      productData: job.productData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

startServer();
