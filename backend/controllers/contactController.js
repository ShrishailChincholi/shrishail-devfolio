const Contact = require("../models/Contact");
const asyncHandler = require("../utils/asyncHandler");
const sendContactEmail = require("../utils/sendEmail");

const createContact = asyncHandler(
  async (req, res) => {
    const {
      name,
      email,
      message
    } = req.body;

    if (!name || !email || !message) {
      res.status(400);

      throw new Error(
        "Name, email and message are required"
      );
    }

    const contact = await Contact.create({
      name,
      email,
      message
    });

    try {
      await sendContactEmail({
        name,
        email,
        message
      });

      contact.emailSent = true;

      await contact.save();

    } catch (emailError) {
      console.error(
        "Email Error:",
        emailError.message
      );
    }

    res.status(201).json({
      success: true,
      message:
        "Your message has been sent successfully.",
      data: {
        id: contact._id,
        emailSent: contact.emailSent
      }
    });
  }
);

const getContacts = asyncHandler(
  async (req, res) => {
    const contacts =
      await Contact.find().sort({
        createdAt: -1
      });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  }
);

const getContactById = asyncHandler(
  async (req, res) => {
    const contact =
      await Contact.findById(
        req.params.id
      );

    if (!contact) {
      res.status(404);

      throw new Error(
        "Contact message not found"
      );
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  }
);

const markContactAsRead = asyncHandler(
  async (req, res) => {
    const contact =
      await Contact.findById(
        req.params.id
      );

    if (!contact) {
      res.status(404);

      throw new Error(
        "Contact message not found"
      );
    }

    contact.isRead = true;

    await contact.save();

    res.status(200).json({
      success: true,
      message: "Message marked as read"
    });
  }
);

const deleteContact = asyncHandler(
  async (req, res) => {
    const contact =
      await Contact.findById(
        req.params.id
      );

    if (!contact) {
      res.status(404);

      throw new Error(
        "Contact message not found"
      );
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Message deleted successfully"
    });
  }
);

module.exports = {
  createContact,
  getContacts,
  getContactById,
  markContactAsRead,
  deleteContact
};