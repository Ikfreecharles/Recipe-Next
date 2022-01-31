import Image from "next/image";
import { PortableText, sanityClient, urlFor } from "../../lib/sanity";

const chefQuery = `*[_type == "chef" && slug.current == $slug][0]{
   _id,
   name,
   image,
   bio
}`;

export default function Chef({ data }) {
  const { chef } = data;
  return (
    <article>
      <h1>{chef.name}</h1>
      <Image
        src={urlFor(chef.image).url()}
        width={100}
        height={100}
        alt={chef.name}
      />
      <PortableText blocks={chef.bio} />
    </article>
  );
}

export async function getStaticPaths() {
  const paths =
    await sanityClient.fetch(`*[_type == "chef" && defined(slug.current)]{
      "params": {
         "slug": slug.current
      }
   }`);
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const chef = await sanityClient.fetch(chefQuery, { slug });
  return { props: { data: { chef } } };
}
