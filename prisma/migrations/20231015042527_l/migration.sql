/*
  Warnings:

  - You are about to drop the `FacilityOnRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FacilityOnRoom" DROP CONSTRAINT "FacilityOnRoom_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "FacilityOnRoom" DROP CONSTRAINT "FacilityOnRoom_roomId_fkey";

-- DropTable
DROP TABLE "FacilityOnRoom";

-- CreateTable
CREATE TABLE "_FacilityToRoom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FacilityToRoom_AB_unique" ON "_FacilityToRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_FacilityToRoom_B_index" ON "_FacilityToRoom"("B");

-- AddForeignKey
ALTER TABLE "_FacilityToRoom" ADD CONSTRAINT "_FacilityToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilityToRoom" ADD CONSTRAINT "_FacilityToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
