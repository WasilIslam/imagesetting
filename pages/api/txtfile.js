import connectMongo from "../../utils/connectMongo";
import Text from "../../models/textModel";
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
    res.send((await Text.findOne({})).data);
  } else if (req.method == "POST") {
    try {
      if (!req.body) {
        throw Error("Body is NULL");
      }
      const { texts } = JSON.parse(req.body);
      const x = await Text.findOne({});
      x.data = texts;
      await x.save();
      res.json("OK");
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
}
