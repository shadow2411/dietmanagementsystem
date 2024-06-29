import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

interface RecipeCardProps {
  recipes: any[];
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipes }) => {
  return (
    <>
      {recipes.map((recipe: any) => (
        <Card key={recipe.id} className="py-4">
          <CardBody className="overflow-visible py-2 items-center">
            <Image
              alt="Card background"
              className="object-cover rounded-xl self-center"
              src={recipe.image}
              width={270}
            />
          </CardBody>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start self-center">
            <h4 className="font-bold text-large">{recipe.title}</h4>
            {recipe.nutrition?.nutrients.map((nutrient: any) => (
              <div key={nutrient.name}>
                <p className="text-tiny uppercase font-bold">{nutrient.name}</p>
                <small className="text-default-500">
                  {nutrient.amount} {nutrient.unit}
                </small>
              </div>
            ))}
          </CardHeader>
        </Card>
      ))}
    </>
  );
};

export default RecipeCard;
