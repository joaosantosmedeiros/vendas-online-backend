/*
  Warnings:

  - You are about to drop the `CartProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CartProduct" DROP CONSTRAINT "CartProduct_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "CartProduct" DROP CONSTRAINT "CartProduct_product_id_fkey";

-- DropTable
DROP TABLE "CartProduct";
