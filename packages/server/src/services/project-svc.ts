import mongoose, { Schema, Document } from "mongoose";
import { Project } from "../models/project.js";

interface ProjectDocument extends Project, Document {}

const ProjectSchema = new Schema<ProjectDocument>(
  {
    projectTitle: { type: String, required: true, trim: true },
    projectLink: { type: String, required: true, trim: true },
    imgSrc: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { collection: "portfolio_projects" }
);

const ProjectModel = mongoose.model<ProjectDocument>("Project", ProjectSchema);

function index(): Promise<ProjectDocument[]> {
  return ProjectModel.find().exec();
}

function get(id: string): Promise<ProjectDocument | null> {
  return ProjectModel.findById(id).exec();
}

function getByTitle(title: string): Promise<Project | null> {
  return ProjectModel.findOne({ projectTitle: title }).exec();
}

function create(project: Project): Promise<Project> {
  const p = new ProjectModel(project);
  return p.save();
}

function update(id: string, project: Partial<Project>): Promise<Project | null> {
    return ProjectModel.findByIdAndUpdate(id, project, { new: true }).exec();
}

function remove(id: string): Promise<Project | null> {
  return ProjectModel.findByIdAndDelete(id).exec();
}

export default { index, get, getByTitle, create, update, remove };
