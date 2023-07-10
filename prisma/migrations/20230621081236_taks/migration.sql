/*
  Warnings:

  - Added the required column `points` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `points` INTEGER NOT NULL;
