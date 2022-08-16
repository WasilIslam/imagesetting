import connectMongo from "../../utils/connectMongo";
import Link from "../../models/linkModel";
import NextCors from "nextjs-cors";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  try {
    if (!req.body) {
      throw Error("Body is NULL");
    }
    await connectMongo();
    const { path, link } = req.body;
    const linkCreated = await Link.create({ path, link });
    res.json(linkCreated);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
