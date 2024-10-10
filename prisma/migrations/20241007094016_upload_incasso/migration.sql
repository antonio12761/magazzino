/*
  Warnings:

  - You are about to drop the column `date` on the `Incasso` table. All the data in the column will be lost.
  - Added the required column `giorno` to the `Incasso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Incasso` DROP COLUMN `date`,
    ADD COLUMN `giorno` DATETIME(3) NOT NULL;
