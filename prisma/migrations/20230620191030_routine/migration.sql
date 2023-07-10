/*
  Warnings:

  - Added the required column `createdBy` to the `Routine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Routine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `routine` ADD COLUMN `createdBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `routineId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Task` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `routineId` INTEGER NOT NULL,
    `points` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RoutineToUser` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_RoutineToUser_AB_unique`(`A`, `B`),
    INDEX `_RoutineToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_routineId_fkey` FOREIGN KEY (`routineId`) REFERENCES `Routine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoutineToUser` ADD CONSTRAINT `_RoutineToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Routine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoutineToUser` ADD CONSTRAINT `_RoutineToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
