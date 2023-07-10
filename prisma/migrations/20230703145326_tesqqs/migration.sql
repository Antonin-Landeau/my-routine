/*
  Warnings:

  - You are about to drop the column `routineId` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `routine` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `routineId`;

-- AddForeignKey
ALTER TABLE `Routine` ADD CONSTRAINT `Routine_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
