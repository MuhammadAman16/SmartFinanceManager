const multer = require('multer');

// Set up multer for file upload
const storage = multer.memoryStorage(); // Store the file in memory temporarily
const upload = multer({ storage: storage });

module.exports = upload