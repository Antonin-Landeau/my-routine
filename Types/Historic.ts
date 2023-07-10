export interface HistoricTaks {
  id: string;
  title: string;
  description: string;
  points: number;
  routineId: string;
}

export interface ScoreResponse {
  id: string;
  userId: string;
  taskId: string;
  createdAt: string;
  task: HistoricTaks;
}

export interface Historic {
  date: string;
  score: number;
  tasks: HistoricTaks[];
}
