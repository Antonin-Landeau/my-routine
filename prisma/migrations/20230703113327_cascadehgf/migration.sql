/*
  Warnings:

  - You are about to drop the column `userId` on the `routine` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `routine` DROP FOREIGN KEY `Routine_userId_fkey`;

-- AlterTable
ALTER TABLE `routine` DROP COLUMN `userId`;
