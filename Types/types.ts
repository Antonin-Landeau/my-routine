export interface Task {
  title: string;
  description: string;
  points: number;
}

export interface RoutineFormData {
  title: string;
  description: string;
  mainImg: string;
  tasks: Task[];
}
