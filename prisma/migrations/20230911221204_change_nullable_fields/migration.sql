/*
  Warnings:

  - Made the column `code` on table `Payment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `payment_date` on table `Payment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount_payments` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "code" SET NOT NULL,
ALTER COLUMN "payment_date" SET NOT NULL,
ALTER COLUMN "amount_payments" SET NOT NULL;
