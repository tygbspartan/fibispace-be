/*
  Warnings:

  - The values [printing,website_creation,digital_marketing] on the enum `ProjectCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProjectCategory_new" AS ENUM ('smm', 'graphic_design', 'ui_ux', 'web_development', 'seo', 'ad_commercial', 'event_management', 'product_shoot');
ALTER TABLE "projects" ALTER COLUMN "category" TYPE "ProjectCategory_new"[] USING ("category"::text::"ProjectCategory_new"[]);
ALTER TYPE "ProjectCategory" RENAME TO "ProjectCategory_old";
ALTER TYPE "ProjectCategory_new" RENAME TO "ProjectCategory";
DROP TYPE "ProjectCategory_old";
COMMIT;
