// controllers/projectController.js
import User from "../models/user.js";

// Get all projects for a user
export const getAllProjects = async (req, res) => {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId).select("projects");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new project
export const addProject = async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveLink, image,status } =
      req.body;
    console.log(req.body);
    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.projects.push({
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      image,
      status,
    });

    await user.save();
    res.status(201).json({ message: "Project added", projects: user.projects });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, techStack, githubLink, liveLink, image, status } =
      req.body;
    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const project = user.projects.id(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.title = title || project.title;
    project.description = description || project.description;
    project.techStack = techStack || project.techStack;
    project.githubLink = githubLink || project.githubLink;
    project.liveLink = liveLink || project.liveLink;
    project.image = image || project.image;
    project.status = status || project.status;
    await user.save();
    res.json({ message: "Project updated", project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a project

import mongoose from "mongoose";

export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.updateOne(
      { _id: userId },
      { $pull: { projects: { _id: projectId } } }
    );

    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
