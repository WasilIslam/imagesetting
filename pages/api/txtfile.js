import connectMongo from "../../utils/connectMongo";
import Link from "../../models/linkModel";
import NextCors from "nextjs-cors";
import fs from "fs";
import path from "path";
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
  //send text file containing text data to front end

  if (req.method == "POST") {
    const { texts } = JSON.parse(req.body);
    var writeStream = fs.createWriteStream("texts.txt");
    writeStream.write(texts);
    writeStream.end();
    res.send("OK");
  } else if (req.method == "GET") {
    var filePath = path.join("texts.txt");
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
      "Content-Type": "txt",
      "Content-Length": stat.size,
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
  }
}
