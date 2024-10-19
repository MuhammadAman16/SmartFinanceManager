const express = require("express");
const accountController = require("../controller/account.controller.js");
const router = express.Router();

// Create a new account
router.post("/", accountController.createAccount);

// Get all accounts
router.get("/", accountController.getAllAccounts);

// Get a specific account by ID
router.get("/:id", accountController.getAccountById);

// Update an account by ID
router.put("/:id", accountController.updateAccount);

// Delete an account by ID
router.delete("/:id", accountController.deleteAccount);

module.exports = router;
