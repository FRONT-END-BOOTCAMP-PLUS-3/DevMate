/*
  Warnings:

  - The `status` column on the `Apply` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `gender` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Apply" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'WAITING';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ApplyStatus";

-- DropEnum
DROP TYPE "Gender";
