/*
  Warnings:

  - Added the required column `userId` to the `Diet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Diet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "age" INTEGER,
    "gender" TEXT,
    "weight" REAL,
    "height" REAL,
    "carb" INTEGER,
    "protein" INTEGER,
    "calorie" INTEGER,
    "allergies" TEXT,
    "health_goals" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Diet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Diet" ("age", "allergies", "calorie", "carb", "gender", "health_goals", "height", "id", "protein", "weight") SELECT "age", "allergies", "calorie", "carb", "gender", "health_goals", "height", "id", "protein", "weight" FROM "Diet";
DROP TABLE "Diet";
ALTER TABLE "new_Diet" RENAME TO "Diet";
CREATE UNIQUE INDEX "Diet_userId_key" ON "Diet"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
