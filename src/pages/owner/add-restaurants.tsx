import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import {
  createRestaurant,
  createRestaurantVariables,
} from "../../__generated__/createRestaurant";
import { CREATE_ACCOUNT_MUTATION } from "../create-account";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
}

export const AddRestaurant = () => {
  const [createRestaurantMutation, { loading, data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION);
  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: "onChange",
  });
  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="container">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h1>Add Restaurant</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: "Name is required." })}
          className="input"
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          {...register("address", { required: "Address is required." })}
          className="input"
          type="text"
          name="address"
          placeholder="Address"
        />
        <input
          {...register("categoryName", {
            required: "Category Name is required.",
          })}
          className="input"
          type="text"
          name="categoryName"
          placeholder="Category Name"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Restaurant"
        />
      </form>
    </div>
  );
};
