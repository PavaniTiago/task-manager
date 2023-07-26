import { Router } from "express";
import { Request, Response } from "express";

const { PrismaClient } = require("@prisma/client");

const router = Router();

const prisma = new PrismaClient();

router.get("/tasks", async function (req: Request, res: Response) {
  const task = await prisma.tasks.findMany();
  res.status(200).json(task) || res.status(500).write("error founding tasks");
});

router.get("/task/:id", async function (req: Request, res: Response) {
  const { id } = req.params;
  const task = await prisma.tasks.findUnique({
    where: { id: Number(id) },
  });
    return res.json(task);
});

router.post("/tasks", async function (req: Request, res: Response) {
  const { name, description } = req.body;

  const task = await prisma.tasks.create({
    data: {
      name,
      description,
    },
  });
  return res.status(201).json(task);
});

router.put("/tasks/:id", async function (req: Request, res: Response) {
  const { id } = req.params;
  const { name, description } = req.body;

  let task = await prisma.tasks.findUnique({
    where: { id: Number(id) },
  });

  task = await prisma.tasks.update({
    where: { id: Number(id) },
    data: {
      name,
      description,
    },
  });
  return res.status(200).json(task);
});

router.delete("/tasks/:id", async function (req: Request, res: Response) {
  const { id } = req.params;
  const tasks = await prisma.tasks.delete({
    where: { id: Number(id) },
  });
  return res.json(tasks);
});

export { router };
