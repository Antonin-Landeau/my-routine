/*
  Warnings:

  - You are about to drop the `task` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `routine` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `routine` MODIFY `description` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `task`;

-- CreateTable
CREATE TABLE `Tasks` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `routineId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_routineId_fkey` FOREIGN KEY (`routineId`) REFERENCES `Routine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
