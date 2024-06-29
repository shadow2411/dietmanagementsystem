"use server";

import { z } from "zod";
import type { Diet } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import {auth} from "@/auth";

const addPreferenceSchema = z.object({
  age: z.number().max(120),
  gender: z.string(),
  weight: z.number(),
  height: z.number(),
  carb: z.number(),
  protein: z.number(),
  calorie: z.number(),
  goal: z.string(),
  allergies: z.string(),
});

interface addPreferenceFormState {
  errors: {
    age?: string[];
    gender?: string[];
    weight?: string[];
    height?: string[];
    carb?: string[];
    protein?: string[];
    calorie?: string[];
    goal?: string[];
    allergies?: string[];
    _form?: string[];
  };
}

export async function addPreference(
  formstate: addPreferenceFormState,
  formData: FormData
): Promise<addPreferenceFormState> {
  const result = addPreferenceSchema.safeParse({
    age: Number(formData.get("age")),
    gender: formData.get("gender") as string,
    weight: Number(formData.get("weight")),
    height: Number(formData.get("height")),
    carb: Number(formData.get("carbs")),
    protein: Number(formData.get("protien")),
    calorie: Number(formData.get("calories")),
    goal: formData.get("healthGoals") as string,
    allergies: formData.get("allergies") as string,
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  } else {
    const {
      age,
      gender,
      weight,
      height,
      carb,
      protein,
      calorie,
      goal,
      allergies,
    } = result.data;
    

    const session = await auth();

    if (!session || !session.user) {
        return {
          errors: {
            _form: ["You must be signed in to create a topic"],
          },
        };
      }

      let diet: Diet;

    try {
      diet = await db.diet.create({
        data: {
          age,
          gender,
          weight,
          height,
          carb,
          protein,
          calorie,
          allergies,
          health_goals: goal,
          userId: session?.user?.id,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        return {
          errors: {
            _form: [error.message],
          },
        };
      } else {
        return {
          errors: {
            _form: ["Something went wrong"],
          },
        };
      }
    }
    redirect("/");
  }
}
