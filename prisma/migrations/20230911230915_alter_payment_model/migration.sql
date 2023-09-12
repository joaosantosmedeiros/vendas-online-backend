-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "code" DROP NOT NULL,
ALTER COLUMN "payment_date" DROP NOT NULL,
ALTER COLUMN "amount_payments" DROP NOT NULL;
