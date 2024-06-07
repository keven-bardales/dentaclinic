/*
  Warnings:

  - Changed the type of `categoryLevel` on the `ProductCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ProductCategory" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "categoryLevel",
ADD COLUMN     "categoryLevel" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "CategoryLevel";
