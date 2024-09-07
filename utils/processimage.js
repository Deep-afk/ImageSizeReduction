const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const Job = require('../model/jobmodel');

const fetchImageAsBuffer = async (url) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
};

const processImages = async (inputUrls, requestId) => {
  console.log("Processing images for request ID:", requestId);
  const job = await Job.findOne({ requestId });
  if (!job) throw new Error('Job not found');

  const outputDir = path.join(__dirname, '../public/images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (let product of job.productData) {
    const outputUrls = [];

    for (const url of inputUrls) {
      try {
        const imageBuffer = await fetchImageAsBuffer(url);

        const outputImageName = `${requestId}-${Date.now()}.jpg`;
        const outputPath = path.join(outputDir, outputImageName);

        await sharp(imageBuffer)
          .jpeg({ quality: 50 })
          .toFile(outputPath);

        const imageUrl = `/images/${outputImageName}`;
        console.log("Processed and saved image:", imageUrl);
        outputUrls.push(imageUrl);

      } catch (err) {
        console.error(`Error processing image ${url}:`, err);
      }
    }

    product.outputImageUrls = outputUrls;
  }

  job.status = 'Completed';
  await job.save();
};

module.exports = { processImages };
