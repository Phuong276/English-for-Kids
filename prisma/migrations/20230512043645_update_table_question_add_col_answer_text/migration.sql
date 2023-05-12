/*
  Warnings:

  - Added the required column `answer_text` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "answer_text" TEXT NOT NULL;
