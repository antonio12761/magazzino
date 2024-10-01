/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Warehouse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Warehouse_title_key` ON `Warehouse`(`title`);
