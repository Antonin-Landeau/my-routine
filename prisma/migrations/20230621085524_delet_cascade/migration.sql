-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `Tasks_routineId_fkey`;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_routineId_fkey` FOREIGN KEY (`routineId`) REFERENCES `Routine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
