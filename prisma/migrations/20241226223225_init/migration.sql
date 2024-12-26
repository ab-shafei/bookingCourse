-- DropForeignKey
ALTER TABLE "ComplaintsAndSuggestions" DROP CONSTRAINT "ComplaintsAndSuggestions_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_centerId_fkey";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplaintsAndSuggestions" ADD CONSTRAINT "ComplaintsAndSuggestions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
