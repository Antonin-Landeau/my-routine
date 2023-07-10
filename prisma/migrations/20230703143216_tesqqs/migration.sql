/*
  Warnings:

  - You are about to drop the `score` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_tasksId_fkey`;

-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_userId_fkey`;

-- DropTable
DROP TABLE `score`;
