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
  await connectMongo();
  if (req.method == "GET") {
    const { path } = req.query;
    console.log(path);
    const data = await Link.findOne({ path });
    console.log(path);
    return res.redirect(data.link);
  } else if (req.method == "POST") {
    try {
      if (!req.body) {
        throw Error("Body is NULL");
      }
      const { path, link } = JSON.parse(req.body);
      console.log(path);
      const x = await Link.findOne({ path });
      x.link = link;
      await x.save();
      res.json("OK");
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
}
