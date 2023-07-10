-- DropForeignKey
ALTER TABLE `routine` DROP FOREIGN KEY `Routine_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Routine` ADD CONSTRAINT `Routine_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
