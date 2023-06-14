/*
  Warnings:

  - You are about to drop the `levels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "levels" DROP CONSTRAINT "levels_round_id_fkey";

-- DropForeignKey
ALTER TABLE "levels" DROP CONSTRAINT "levels_user_id_fkey";

-- DropTable
DROP TABLE "levels";
