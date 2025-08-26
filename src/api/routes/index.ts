import { Router } from "express";
import { usersRouter } from "./users";
import { tasksRouter } from "./tasks";

const apiRouter = Router();

// API routes
apiRouter.use("/users", usersRouter);
apiRouter.use("/tasks", tasksRouter);

// API info
apiRouter.get("/", (_req, res) => {
  res.json({
    message: "Boilerplate API",
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
      tasks: "/api/tasks",
    },
  });
});

export { apiRouter };
