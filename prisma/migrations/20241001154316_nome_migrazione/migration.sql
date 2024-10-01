/*
  Warnings:

  - You are about to alter the column `referenceNumber` on the `AddStockAdjustment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `title` on the `Brand` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `title` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `description` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `phone` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `contactPerson` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `paymentTerms` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `taxID` on the `Supplier` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `referenceNumber` on the `TransferStockAdjustment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `title` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `abbreviation` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `title` on the `Warehouse` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `AddStockAdjustment` MODIFY `referenceNumber` VARCHAR(100) NOT NULL,
    MODIFY `notes` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `Brand` MODIFY `title` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `Category` MODIFY `title` VARCHAR(100) NOT NULL,
    MODIFY `description` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `Supplier` MODIFY `phone` VARCHAR(100) NULL,
    MODIFY `address` VARCHAR(500) NULL,
    MODIFY `contactPerson` VARCHAR(100) NULL,
    MODIFY `paymentTerms` VARCHAR(100) NULL,
    MODIFY `taxID` VARCHAR(100) NULL,
    MODIFY `notes` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `TransferStockAdjustment` MODIFY `referenceNumber` VARCHAR(100) NOT NULL,
    MODIFY `notes` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `Unit` MODIFY `title` VARCHAR(100) NOT NULL,
    MODIFY `abbreviation` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `Warehouse` MODIFY `title` VARCHAR(100) NOT NULL,
    MODIFY `location` VARCHAR(500) NULL,
    MODIFY `description` TEXT NULL;
