import { Routine } from "@prisma/client";
import axios from "axios";

const fetchRoutines = async (): Promise<Routine[]> => {
  const res = await axios.get(`/api/routines`);
  return res.data;  
};
