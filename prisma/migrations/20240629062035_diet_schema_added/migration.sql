-- CreateTable
CREATE TABLE "Diet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "age" INTEGER,
    "gender" TEXT,
    "weight" REAL,
    "height" REAL,
    "dietary_pref" TEXT,
    "allergies" TEXT,
    "health_goals" TEXT NOT NULL,
    CONSTRAINT "Diet_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
