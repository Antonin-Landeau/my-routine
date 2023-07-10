/*
  Warnings:

  - You are about to drop the column `titlie` on the `routine` table. All the data in the column will be lost.
  - Added the required column `title` to the `Routine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `routine` DROP COLUMN `titlie`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
