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

export default router;