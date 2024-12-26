/*
  Warnings:

  - You are about to drop the `_CourseToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CourseToUser" DROP CONSTRAINT "_CourseToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToUser" DROP CONSTRAINT "_CourseToUser_B_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "studentCount" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "_CourseToUser";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
