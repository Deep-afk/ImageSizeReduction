# Image Size Reduction

This project is a backend system that allows users to upload a CSV file containing product details and image URLs. The system asynchronously processes the images, reducing their size by 50%, and provides a status update via an API.

## Features
- Upload CSV files with image URLs and product information.
- Asynchronously compress images by reducing their quality by 50%.
- Track the progress of image processing through a status API.
- Generates compressed images in your local project.

## Table of Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [APIs](#apis)
  - [Upload API](#upload-api)
  - [Status API](#status-api)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Getting Started

These instructions will help you set up the project locally for development and testing purposes.

### Prerequisites
- Node.js (v14 or later)
- MongoDB (or any other database supported by the project)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Deep-afk/ImageSizeReduction.git
    ```
   
2. Navigate to the project directory:
    ```bash
    cd ImageSizeReduction
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up the environment variables:
   - Replace `<your-mongo-database-url>` with your actual MongoDB connection string.

5. Start the server:
    ```bash
    npm start
    ```

6. The application will start on `http://localhost:3000`.

## Usage

1. Upload a CSV file containing product names and image URLs.
2. The server will process the images asynchronously.
3. Use the status API to check the progress of image processing.

## APIs

### Upload API

**Endpoint:** `/upload`  
**Method:** `POST`  
**Description:** Accepts a CSV file with product details and image URLs, assigns a unique request ID, and begins image processing.

**Request Example:**
```bash
curl -X POST http://localhost:3000/upload \
  -F 'file=@/path/to/your/file.csv'
```

**CSV Format:**

| Serial Number	| Product Name	| Input Image URLs |
| ------------- | ------------- | ---------------- | 
|1	| Product A	| https://example.com/image1.jpg,https://example.com/image2.jpg |
|2	| Product B	| https://example.com/image3.jpg |

**Response Example:**
```bash
{
  "requestId": "12345abcd"
}
```

### Status API
**Endpoint:** `/status/:requestId`
**Method:** `GET`
**Description:** Checks the status of the image processing job using the request ID.

**Request Example:**
```bash
curl --location 'localhost:3000/status/e95d16b3-df4b-4660-adff-963bfe6175f1'
```

**Response Example:**
```bash
{
  "requestId": "12345abcd",
  "status": "Completed",
  "productData": [
    {
      "productName": "Product A",
      "inputImageUrls": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ],
      "outputImageUrls": [
        "/images/processed-image1.jpg",
        "/images/processed-image2.jpg"
      ]
    }
  ]
}
```

### Project Structure
```bash
ImageSizeReduction/
├── public/
│   └── images/            # Processed images saved here
├── models/
│   └── jobmodel.js        # Job model for MongoDB
├── utils/
│   └── processimage.js     # Image processing logic
│   └── jobqueue.js         # Job queue for asynchronous processing
│   └── validate.js         # validate CSV file
├── index.js               # Main application entry point
└── package.json           # Project dependencies and scripts
```

### Technologies Used
- Node.js: Server-side JavaScript runtime.
- Express: Web framework for creating APIs.
- Multer: Middleware for handling file uploads.
- Sharp: High-performance image processing.
- MongoDB: NoSQL database for storing job and image data.
- Axios: HTTP client for fetching images from URLs.
- uuid: Unique ID generator


### License
This project is licensed under the MIT License. See the [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) file for more details.


### Additional Steps:
1. **Testing**: Add examples and instructions on how to test the system locally (e.g., using Postman or cURL).
2. **Contributions**: Add a section for contributions if you plan to open the repository for collaboration.
3. **Links**: Add any relevant links, such as to the live deployment, project documentation, or APIs.

Feel free to let me know if you need any more adjustments!

### Future Enhancements:
1. Compressing an image and providing its URL using Amazon S3.
2. Host the website and allow the user to control the level of compression.

