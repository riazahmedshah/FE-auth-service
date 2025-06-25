/*
  Warnings:

  - The primary key for the `User_Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User_Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User_Role" DROP CONSTRAINT "User_Role_pkey",
DROP COLUMN "id",
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "User_Role_pkey" PRIMARY KEY ("roleId", "userId");
