import { db } from "@/lib/db";

export const isParticipating = async (userId?: string, routineId?: string) => {
  if (!userId) {
    return false;
  }
  const isParticipant = await db.participation.findFirst({
    where: {
      userId,
      routineId,
    },
  });

  if (isParticipant) {
    return true;
  }
};
