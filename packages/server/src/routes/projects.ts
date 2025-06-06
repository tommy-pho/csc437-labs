import express, { Request, Response } from "express";
import ProjectService from "../services/project-svc.js";
import { Project } from "../models/project.js";

const router = express.Router();

// GET /api/projects - Get all projects
router.get("/", (req: Request, res: Response) => {
    ProjectService.index()
        .then((projects) => {
            res.status(200).json(projects);
        })
        .catch((err) => {
            console.error("Error fetching projects:", err);
            res.status(500).send("Error fetching projects from database.");
        });
});

// GET /api/projects/:id - Get a single project by ID
router.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    ProjectService.get(id)
        .then((project) => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).send("Project not found");
            }
        })
        .catch((err) => {
            console.error(`Error fetching project with id ${id}:`, err);
            res.status(500).send("Error fetching project.");
        });
});

// POST /api/projects - Create a new project
router.post("/", (req: Request, res: Response) => {
    const newProject = req.body as Project; // Get project data from request body
    ProjectService.create(newProject)
        .then((project) => {
            res.status(201).json(project); // 201 Created
        })
        .catch((err) => {
            console.error("Error creating project:", err);
            res.status(500).send("Error creating project.");
        });
});

// PUT /api/projects/:id - Update a project
router.put("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const newProjectData = req.body as Partial<Project>;
    ProjectService.update(id, newProjectData)
        .then((updatedProject) => {
            if (updatedProject) {
                res.status(200).json(updatedProject);
            } else {
                res.status(404).send("Project not found, cannot update.");
            }
        })
        .catch((err) => {
            console.error(`Error updating project ${id}:`, err);
            res.status(500).send("Error updating project.");
        });
});

// DELETE /api/projects/:id - Delete a project
router.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    ProjectService.remove(id)
        .then((deletedProject) => {
            if (deletedProject) {
                res.status(204).end(); // 204 No Content
            } else {
                res.status(404).send("Project not found, cannot delete.");
            }
        })
        .catch((err) => {
            console.error(`Error deleting project ${id}:`, err);
            res.status(500).send("Error deleting project.");
        });
});

export default router;