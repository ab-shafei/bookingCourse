-- CreateEnum
CREATE TYPE "Level" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'EASY';
