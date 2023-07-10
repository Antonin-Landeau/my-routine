/*
  Warnings:

  - You are about to drop the column `tasksId` on the `score` table. All the data in the column will be lost.
  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_tasksId_fkey`;

-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `Tasks_routineId_fkey`;

-- AlterTable
ALTER TABLE `score` DROP COLUMN `tasksId`;

-- DropTable
DROP TABLE `tasks`;
