import { AceBase } from "acebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const db = new AceBase("mydb");
    const body = req.body;
    await db.ref(`itemList/${body}`).remove();

    res.status(200).send({ message: "Success!" });
  } else {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
}
