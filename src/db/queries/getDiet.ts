import { db } from "@/db";

import type { Diet } from "@prisma/client";

export function getDiet(id: string): Promise<Diet | null> {
  return db.diet.findFirst({
    where: {
        userId: id
    }
  });
}
