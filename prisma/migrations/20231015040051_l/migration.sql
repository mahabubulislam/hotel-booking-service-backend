-- CreateEnum
CREATE TYPE "Role" AS ENUM ('super_admin', 'admin', 'customer');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'customer',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "bed" INTEGER NOT NULL,
    "bathroom" INTEGER NOT NULL,
    "balcony" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FacilityOnRoom" (
    "roomId" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,

    CONSTRAINT "FacilityOnRoom_pkey" PRIMARY KEY ("roomId","facilityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Facility_name_key" ON "Facility"("name");

-- AddForeignKey
ALTER TABLE "FacilityOnRoom" ADD CONSTRAINT "FacilityOnRoom_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilityOnRoom" ADD CONSTRAINT "FacilityOnRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
