export interface Task {
  title: string;
  description: string;
  points: number;
  id?: string;
}

export interface RoutineFormData {
  title: string;
  description: string;
  mainImg: string;
  tasks: Task[];
}
