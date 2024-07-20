-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "Parent" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Child" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "age" INTEGER NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "parentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FacePhoto" (
    "id" SERIAL NOT NULL,
    "photo" TEXT NOT NULL,
    "childId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FacePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Parent_email_key" ON "Parent"("email");

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacePhoto" ADD CONSTRAINT "FacePhoto_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
