import { Button, Link } from "@nextui-org/react";
import { auth } from "@/auth";
import { getDiet } from "@/db/queries/getDiet";
import type { Diet } from "@prisma/client";
import RecipeCard from "@/components/RecipeCard";
import axios from "axios";
import Image from "next/image";
import bowlImg from "./bowl.jpeg";
interface DietInterface {
  diet: Diet;
}

export default async function Home({ diet }: DietInterface) {
  const session = await auth();
  if (!session?.user) {
    return <h1 className="text-2xl">You are not signed in</h1>;
  } else {
    const diet1 = await getDiet(session.user.id);

    if (diet1 === null) {
      return (
        <>
          <div className="relative h-screen">
            <Image src={bowlImg} alt="hero" fill className="object-cover" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white">
                  Fill In Your Preferences to Get Started
                </h1>
                <Link href="/fillpreferences">
                  <Button className="mt-4 text-white" color="primary">
                    Fill Preferences
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      const {
        age,
        height,
        weight,
        gender,
        carb,
        protein,
        calorie,
        allergies,
        health_goals,
      } = diet1;

      const recipes = await fetchRecipes({ carb, protein, calorie });

      return (
        <>
          <h1 className="text-2xl">Your Diet</h1>
          <div className="grid grid-cols-3 gap-5 items-center mx-auto">
            <RecipeCard recipes={recipes} />
          </div>
        </>
      );
    }
  }
}

async function fetchRecipes({
  carb,
  protein,
  calorie,
}: {
  carb: number | null;
  protein: number | null;
  calorie: number | null;
}) {
  const minCarb = carb ?? 0;
  const minProtein = protein ?? 0;
  const minCalorie = calorie ?? 0;
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&minCarbs=${minCarb}&minProtein=${minProtein}&minCalories=${minCalorie}`
  );
  return response.data.results;
}
