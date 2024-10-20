const express = require("express");
const router = express.Router();
const recordController = require("../controller/record.controller");
const upload = require('./../middlewares/upload');
// Route to get all records with optional filters
router.get("/", recordController.getAllRecords);

// Route to get a record by ID
router.get("/:id", recordController.getRecordById);

// Route to create a new record
router.post("/", upload.single('file'),recordController.createRecord);

// Route to update a record by ID
router.put("/:id", recordController.updateRecord);

// Route to delete a record by ID
router.delete("/:id", recordController.deleteRecord);

module.exports = router;
