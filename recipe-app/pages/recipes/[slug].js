import {
  sanityClient,
  urlFor,
  usePreviewSubscription,
  PortableText,
} from "../../lib/sanity";
import Image from "next/image";
import { useState } from "react";
import useRouter from "next/router";

const recipeQuery = `
*[_type == "recipe" && slug.current == $slug][0]{
   _id,
   name,
   slug,
   mainImage,
   ingredient[]{
      _key,
      unit,
      wholeNumber,
      fraction,
      unit,
      ingredient->{
         name
      }
   },
   instructions,
   likes,
   dislikes
}
`;

export default function Recipe({ data }) {
  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;

  const { recipe } = data;

  const [likes, setLikes] = useState(data?.recipe.likes);
  const [dislikes, setDislikes] = useState(data?.recipe.dislikes);

  const addLike = async () => {
    const res = await fetch("/api/handle-like", {
      method: "POST",
      body: JSON.stringify({ _id: recipe._id }),
    }).catch((error) => console.log(error));
    const data = await res.json();
    setLikes(data.likes);
  };

  const addDislikes = async () => {
    try {
      const res = await fetch("/api/handle-dislike", {
        method: "POST",
        body: JSON.stringify({ _id: recipe._id }),
      });
      const data = await res.json();
      setDislikes(data.dislikes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article>
      <h1>{recipe?.name}</h1>
      <button onClick={addLike}>{likes}❤️</button>
      <button onClick={addDislikes}>{dislikes}💔</button>
      <main>
        <Image
          src={urlFor(recipe?.mainImage).url()}
          height={250}
          width={250}
          alt={recipe?.name}
        />
        <div>
          <ul>
            {recipe.ingredient?.map((ingredient) => (
              <li key={ingredient._key}>
                {ingredient.wholeNumber}
                {ingredient.fraction} {ingredient.unit}{" "}
                {ingredient.ingredient.name}
              </li>
            ))}
          </ul>
          <PortableText blocks={recipe?.instructions} />
        </div>
      </main>
    </article>
  );
}

//to list out all the possible paths Next can put inside the dynamic path
export async function getStaticPaths() {
  const paths =
    await sanityClient.fetch(`*[_type == "recipe" && defined(slug.current)]{
      "params": {
         "slug": slug.current
      }
   }`);
  return { paths, fallback: true };
}

//to retrieve the data in each path
export async function getStaticProps({ params }) {
  const { slug } = params;
  const recipe = await sanityClient.fetch(recipeQuery, { slug });
  return { props: { data: { recipe } } };
}
