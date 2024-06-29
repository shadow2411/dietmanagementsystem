/*
  Warnings:

  - You are about to drop the column `dietary_pref` on the `Diet` table. All the data in the column will be lost.

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
    CONSTRAINT "Diet_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Diet" ("age", "allergies", "gender", "health_goals", "height", "id", "weight") SELECT "age", "allergies", "gender", "health_goals", "height", "id", "weight" FROM "Diet";
DROP TABLE "Diet";
ALTER TABLE "new_Diet" RENAME TO "Diet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
