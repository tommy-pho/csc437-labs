import express, { Request, Response } from "express";
import { connect as connectDB } from "./services/mongo";
import ProjectService from "./services/project-svc.js";
import projectsRouter from "./routes/projects.js";
import authRouter, { authenticateUser } from "./routes/auth.js";

const DBNAME = process.env.DB_NAME || "portfolioDB";
connectDB(DBNAME);

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

// middleware
app.use(express.json());

// mount the auth router
app.use("/auth", authRouter);

// mount the protected router with middleware
app.use("/api/projects", authenticateUser, projectsRouter);

// mount the router
app.use("/api/projects", projectsRouter);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World from Express Server!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});