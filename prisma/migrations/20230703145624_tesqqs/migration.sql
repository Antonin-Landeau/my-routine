/*
  Warnings:

  - You are about to drop the column `userId` on the `routine` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Routine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `routine` DROP FOREIGN KEY `Routine_userId_fkey`;

-- AlterTable
ALTER TABLE `routine` DROP COLUMN `userId`,
    ADD COLUMN `authorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Routine` ADD CONSTRAINT `Routine_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
