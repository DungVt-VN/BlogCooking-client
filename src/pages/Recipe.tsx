import { Fragment } from "react/jsx-runtime";
import RecipeItem from "../components/RecipeItem";

const Recipe = () => {
    return (
        <Fragment>
            <div className="h-[calc(100vh-64px)] overflow-y-scroll flex justify-center flex-wrap p-4">
                <RecipeItem />
                <RecipeItem />
                <RecipeItem />
                <RecipeItem />
                <RecipeItem />
                <RecipeItem />
                <RecipeItem />
                <RecipeItem />

            </div>
        </Fragment>
    );
};

export default Recipe;
