"use server";

import { z } from "zod";
import type { Diet } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";

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
  console.log(result);
  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
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
        },
      });
      console.log("Data Saving Successful");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return {
          errors: {
            _form: [error.message],
          },
        };
      } else {
        console.log("Something went wrong");
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
