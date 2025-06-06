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
var projects_exports = {};
__export(projects_exports, {
  default: () => projects_default
});
module.exports = __toCommonJS(projects_exports);
var import_express = __toESM(require("express"));
var import_project_svc = __toESM(require("../services/project-svc.js"));
const router = import_express.default.Router();
router.get("/", (req, res) => {
  import_project_svc.default.index().then((projects) => {
    res.status(200).json(projects);
  }).catch((err) => {
    console.error("Error fetching projects:", err);
    res.status(500).send("Error fetching projects from database.");
  });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  import_project_svc.default.get(id).then((project) => {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).send("Project not found");
    }
  }).catch((err) => {
    console.error(`Error fetching project with id ${id}:`, err);
    res.status(500).send("Error fetching project.");
  });
});
router.post("/", (req, res) => {
  const newProject = req.body;
  import_project_svc.default.create(newProject).then((project) => {
    res.status(201).json(project);
  }).catch((err) => {
    console.error("Error creating project:", err);
    res.status(500).send("Error creating project.");
  });
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newProjectData = req.body;
  import_project_svc.default.update(id, newProjectData).then((updatedProject) => {
    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).send("Project not found, cannot update.");
    }
  }).catch((err) => {
    console.error(`Error updating project ${id}:`, err);
    res.status(500).send("Error updating project.");
  });
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  import_project_svc.default.remove(id).then((deletedProject) => {
    if (deletedProject) {
      res.status(204).end();
    } else {
      res.status(404).send("Project not found, cannot delete.");
    }
  }).catch((err) => {
    console.error(`Error deleting project ${id}:`, err);
    res.status(500).send("Error deleting project.");
  });
});
var projects_default = router;
