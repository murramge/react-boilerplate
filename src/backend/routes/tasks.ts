import { Router, Request, Response } from "express";

const tasksRouter = Router();

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

// Mock data
let tasks: Task[] = [
  {
    id: "1",
    title: "Setup project",
    description: "Initialize the boilerplate project",
    completed: true,
    priority: "high",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Create API endpoints",
    description: "Build REST API with Express",
    completed: false,
    priority: "medium",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET /api/tasks
tasksRouter.get("/", (req: Request, res: Response) => {
  const { completed, priority } = req.query;

  let filteredTasks = tasks;

  if (completed !== undefined) {
    filteredTasks = filteredTasks.filter(
      (task) => task.completed === (completed === "true")
    );
  }

  if (priority) {
    filteredTasks = filteredTasks.filter((task) => task.priority === priority);
  }

  res.json({
    data: filteredTasks,
    total: filteredTasks.length,
  });
});

// GET /api/tasks/:id
tasksRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ data: task });
});

// POST /api/tasks
tasksRouter.post("/", (req: Request, res: Response) => {
  const { title, description, priority = "medium" } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask: Task = {
    id: (tasks.length + 1).toString(),
    title,
    description,
    completed: false,
    priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json({ data: newTask });
});

// PUT /api/tasks/:id
tasksRouter.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed, priority } = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title ?? tasks[taskIndex].title,
    description: description ?? tasks[taskIndex].description,
    completed: completed ?? tasks[taskIndex].completed,
    priority: priority ?? tasks[taskIndex].priority,
    updatedAt: new Date().toISOString(),
  };

  res.json({ data: tasks[taskIndex] });
});

// DELETE /api/tasks/:id
tasksRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

export { tasksRouter };
