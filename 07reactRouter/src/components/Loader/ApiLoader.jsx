import { useLoaderData } from "react-router-dom";

export const ApiLoader = async () => {
    const response = await fetch('https://api.github.com/users/umeshraut2002')
    return response.json();
}