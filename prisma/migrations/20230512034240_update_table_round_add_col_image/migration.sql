/*
  Warnings:

  - Added the required column `image` to the `rounds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rounds" ADD COLUMN     "image" TEXT NOT NULL;
