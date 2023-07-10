/*
  Warnings:

  - You are about to drop the column `createdBy` on the `routine` table. All the data in the column will be lost.
  - You are about to drop the `_routinetouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_routinetouser` DROP FOREIGN KEY `_RoutineToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_routinetouser` DROP FOREIGN KEY `_RoutineToUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_routineId_fkey`;

-- AlterTable
ALTER TABLE `routine` DROP COLUMN `createdBy`,
    MODIFY `description` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_routinetouser`;

-- DropTable
DROP TABLE `task`;
