const express = require("express");

const {
  createContact,
  getContacts,
  getContactById,
  markContactAsRead,
  deleteContact
} = require("../controllers/contactController");

const router = express.Router();

router.post(
  "/",
  createContact
);

router.get(
  "/",
  getContacts
);

router.get(
  "/:id",
  getContactById
);

router.patch(
  "/:id/read",
  markContactAsRead
);

router.delete(
  "/:id",
  deleteContact
);

module.exports = router;