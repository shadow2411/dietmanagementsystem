"use client";
import React from "react";
import { Slider, Input, Radio, RadioGroup, Button } from "@nextui-org/react";
import { useFormStatus, useFormState } from "react-dom";
import * as actions from "@/actions";
//age, gender, weight, height, dietary preferences, allergies, and health goals.

export default function Form() {
  const { pending } = useFormStatus();
  const [fromState, action] = useFormState(actions.addPreference, {
    errors: {},
  });
  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-3xl font-extralight ">
        Please fill the form to get personalised recipes
      </h1>
      <form action={action} method="POST">
        <div className="flex flex-col gap-y-6">
          <Input
            label="Age"
            name="age"
            type="number"
            isInvalid={!!fromState.errors.age}
            errorMessage={fromState.errors.age?.join(", ")}
          />

          <RadioGroup label="Gender" name="gender">
            <div className="flex flex-row gap-x-4">
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </div>
          </RadioGroup>

          <Input
            label="Weight(kg)"
            name="weight"
            type="number"
            isInvalid={!!fromState.errors.weight}
            errorMessage={fromState.errors.weight?.join(", ")}
          />
          <Input
            label="Height(cm)"
            name="height"
            type="number"
            isInvalid={!!fromState.errors.height}
            errorMessage={fromState.errors.height?.join(", ")}
          />
          <Slider
            label="Carbs"
            step={10}
            maxValue={100}
            minValue={10}
            defaultValue={20}
            className="max-w-md"
            name="carbs"
          />
          <Slider
            label="Protien"
            step={10}
            maxValue={100}
            minValue={10}
            defaultValue={20}
            className="max-w-md"
            name="protien"
          />
          <Slider
            label="Calories"
            step={10}
            maxValue={800}
            minValue={50}
            defaultValue={200}
            className="max-w-md"
            name="calories"
          />
          <RadioGroup label="Health Goals" name="healthGoals">
            <div className="flex flex-row gap-x-4">
              <Radio value="Weight Gain" name="healthGoals">
                Weight Gain
              </Radio>
              <Radio value="Weight Loss" name="healthGoals">
                Weight Loss
              </Radio>
            </div>
          </RadioGroup>
          <Input
            type="text"
            label="Allergies"
            name="allergies"
            isInvalid={!!fromState.errors.allergies}
            errorMessage={fromState.errors.allergies?.join(", ")}
          />
          <Button isLoading={pending} type="submit" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
