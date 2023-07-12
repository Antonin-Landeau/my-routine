import { Task } from "./types";

export interface RoutineWithTasks {
  id: string;
  title: string;
  description: string;
  mainImg: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: Task[];
}


