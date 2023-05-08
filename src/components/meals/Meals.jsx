import React from "react";
import { product } from "../utils/constants";
import styled from "styled-components";
import { MealSummaryCard } from "./MealSummaryCard";
import { MealItem } from "./MealItem";

export const Meals = () => {
  return (
    <>
      <MealSummaryCard />
      <Container>
        {product.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: #fff;
  width: 80%;
  margin: 50px auto;
  padding: 40px;
  border-radius: 16px;
  margin-top: 40px;
`;
