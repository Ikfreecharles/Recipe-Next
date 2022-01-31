import Image from "next/image";
import Link from "next/link";
import { sanityClient, urlFor } from "../../lib/sanity";

const chefsQuery = `*[_type == "chef"]{
   _id,
   name,
   slug,
   image
}`;

export default function Chefs({ chefs }) {
  return (
    <section>
      <h1>List of our Chefs</h1>
      <ul>
        {chefs?.map((chef) => (
          <li key={chef._id}>
            <Link href={`/chefs/${chef.slug.current}`}>
              <a>
                <Image
                  src={urlFor(chef.image).url()}
                  height={200}
                  width={100}
                  alt={chef.name}
                />
                <span>{chef.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function getStaticProps() {
  const chefs = await sanityClient.fetch(chefsQuery);
  return {
    props: { chefs },
  };
}
