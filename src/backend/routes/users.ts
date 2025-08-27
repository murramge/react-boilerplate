import { Router, Request, Response } from "express";

const usersRouter = Router();

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

// Mock data
let users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    createdAt: new Date().toISOString(),
  },
];

// GET /api/users
usersRouter.get("/", (_req: Request, res: Response) => {
  res.json({
    data: users,
    total: users.length,
  });
});

// GET /api/users/:id
usersRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ data: user });
});

// POST /api/users
usersRouter.post("/", (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const newUser: User = {
    id: (users.length + 1).toString(),
    name,
    email,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  res.status(201).json({ data: newUser });
});

// PUT /api/users/:id
usersRouter.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users[userIndex] = { ...users[userIndex], name, email };
  res.json({ data: users[userIndex] });
});

// DELETE /api/users/:id
usersRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

export { usersRouter };
