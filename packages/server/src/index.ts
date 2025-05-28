import express, { Request, Response } from "express";
import { connect as connectDB } from "./services/mongo";
import ProjectService from "./services/project-svc.js";

const DBNAME = process.env.DB_NAME || "portfolioDB";
connectDB(DBNAME);

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World from Express Server!");
});

app.get("/api/projects", (req: Request, res: Response) => {
  ProjectService.index()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error fetching projects from database.");
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});