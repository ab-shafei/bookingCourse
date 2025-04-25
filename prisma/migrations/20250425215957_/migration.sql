-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_studentId_courseId_key" ON "Favorite"("studentId", "courseId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
