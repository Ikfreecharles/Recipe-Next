import { sanityClient } from "../../lib/sanity";

sanityClient.config({
  token: process.env.SANITY_WRITE_TOKEN,
});

export default async function dislikeButtonHandler(req, res) {
  const { _id } = JSON.parse(req.body);
  const data = await sanityClient
    .patch(_id)
    .setIfMissing({ dislikes: 0 })
    .inc({ dislikes: 1 })
    .commit()
    .catch((error) => console.log(error));

  res.status(200).json({ dislikes: data.dislikes });
}
