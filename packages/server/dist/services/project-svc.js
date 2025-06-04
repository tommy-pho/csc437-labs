"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var project_svc_exports = {};
__export(project_svc_exports, {
  default: () => project_svc_default
});
module.exports = __toCommonJS(project_svc_exports);
var import_mongoose = __toESM(require("mongoose"));
const ProjectSchema = new import_mongoose.Schema(
  {
    projectTitle: { type: String, required: true, trim: true },
    projectLink: { type: String, required: true, trim: true },
    imgSrc: { type: String, trim: true },
    description: { type: String, required: true, trim: true }
  },
  { collection: "portfolio_projects" }
);
const ProjectModel = import_mongoose.default.model("Project", ProjectSchema);
function index() {
  return ProjectModel.find().exec();
}
function get(id) {
  return ProjectModel.findById(id).exec();
}
function getByTitle(title) {
  return ProjectModel.findOne({ projectTitle: title }).exec();
}
function create(project) {
  const p = new ProjectModel(project);
  return p.save();
}
var project_svc_default = { index, get, getByTitle, create };
