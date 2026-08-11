const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"]
    },

    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"]
    },

    image: {
      type: String,
      default: ""
    },

    technologies: {
      type: [String],
      default: []
    },

    githubUrl: {
      type: String,
      default: ""
    },

    liveUrl: {
      type: String,
      default: ""
    },

    featured: {
      type: Boolean,
      default: false
    },

    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Project",
  projectSchema
);