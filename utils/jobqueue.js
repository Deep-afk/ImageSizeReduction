const { processImages } = require('./processimage');
const Job = require('../model/jobmodel');

const jobQueue = [];

const createJob = async (csvData) => {
  const requestId = generateUniqueId();
  const job = new Job({
    requestId,
    productData: csvData.map(row => ({
      productName: row['Product Name'],
      inputImageUrls: row['Input Image Urls'].split(',').map(url => url.trim()),
      outputImageUrls: [],
    })),
  });

  await job.save();
  jobQueue.push({ requestId, csvData });
  await processJobs();
  return requestId;
};

const processJobs = async () => {
  while (jobQueue.length > 0) {
    const job = jobQueue.shift();
    const { requestId, csvData } = job;
    console.log("job",job);
    for (const row of csvData) {
      const inputUrls = row['Input Image Urls'].split(',').map(url => url.trim());
      await processImages(inputUrls, requestId);
    }
  }
};

const generateUniqueId = () => {
  return require('uuid').v4();
};

module.exports = { createJob };
