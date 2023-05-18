// "use client";
// import withAuth from "@/hooks/withAuth";
// import React from "react";
// import withApplicationShell from "../components/AppShell";
// import { Button } from "@mantine/core";
// import { IRecipes } from "@/types";
// import RecipesItem from "./RecipesItem";

// type Props = {
//   recipes: IRecipes[] | [];
//   setRecipes: (value: boolean) => void;
// };

// const Recipes = ({ recipes, setRecipes }: Props) => {
//   return (
//     <div>
//       <>
//         {recipes?.length > 0 &&
//           recipes?.map((recipe, index) => (
//             <RecipesItem key={index} recipe={recipe} />
//           ))}
//       </>
//       <div className="flex gap-3 items-center mt-5">
//         {recipes.length === 0 ? (
//           <p className="font-medium">Ви не маєте направлень</p>
//         ) : (
//           <p className="font-medium">Ваші направлення</p>
//         )}
//         <Button variant={"default"} onClick={() => setRecipes(true)}>
//           Створити
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default withAuth(withApplicationShell(Recipes));
