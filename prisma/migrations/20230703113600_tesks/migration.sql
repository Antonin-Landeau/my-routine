-- AlterTable
ALTER TABLE `score` ADD COLUMN `tasksId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Tasks` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL,
    `routineId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_routineId_fkey` FOREIGN KEY (`routineId`) REFERENCES `Routine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_tasksId_fkey` FOREIGN KEY (`tasksId`) REFERENCES `Tasks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
