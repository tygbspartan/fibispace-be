-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "contactinfos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "orgName" TEXT,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contactinfos_pkey" PRIMARY KEY ("id")
);
