export interface LeaderBoardRes {
  id: string;
  userId: string;
  taskId: string;
  routineId: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: null | boolean;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  };
  task: {
    points: number;
  };
}

export interface ILeaderBoardItem {
  user: {
    id: string;
    name: string;
    image: string;
  };
  score: number;
}

