const fs = require('fs');
const csv = require('csv-parser');

const parseCSV = (filePath) => {
  console.log("inside parseCSV");
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        if (!validateCSV(results)) {
          return reject(new Error('Invalid CSV format'));
        }
        console.log("valid csv");
        resolve(results);
      });
  });
};

const validateCSV = (data) => {
  console.log("data",data);
  console.log("inside validateCSV");
  return data.every(
    (row) => row['Product Name'] && row['Input Image Urls']
  );
};

module.exports = { parseCSV };