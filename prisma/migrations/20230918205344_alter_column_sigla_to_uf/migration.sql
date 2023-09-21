/*
  Warnings:

  - You are about to drop the column `sigla` on the `State` table. All the data in the column will be lost.
  - Added the required column `uf` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "State" DROP COLUMN "sigla",
ADD COLUMN     "uf" TEXT NOT NULL;
