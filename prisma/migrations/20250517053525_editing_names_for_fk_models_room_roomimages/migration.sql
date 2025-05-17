/*
  Warnings:

  - You are about to drop the column `fk_categoryID` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `fk_roomID` on the `RoomImages` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `RoomImages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_fk_categoryID_fkey";

-- DropForeignKey
ALTER TABLE "RoomImages" DROP CONSTRAINT "RoomImages_fk_roomID_fkey";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "fk_categoryID",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RoomImages" DROP COLUMN "fk_roomID",
ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomImages" ADD CONSTRAINT "RoomImages_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
