import { AceBase } from "acebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const db = new AceBase("mydb");
    const body = req.body;
    await db.ref("test").update(body);
    const snap = await db.ref("test/text").get();
    const snapVal = snap.val();
    res.status(200).send({ snapVal });
  } else {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
}
