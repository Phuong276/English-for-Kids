/*
  Warnings:

  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "admins";
