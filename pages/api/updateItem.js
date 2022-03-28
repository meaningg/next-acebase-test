import { AceBase } from "acebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const db = new AceBase("mydb");
    const body = req.body;

    await db.ref(`itemList/${body.id}`).update(body);
    const itemList = [];
    await db
      .ref("itemList")
      .get()
      .then((snapshot) => {
        const data = snapshot.val();
        for (let i in data) {
          itemList.push(data[i]);
        }
      });

    res.status(200).send({ itemList });
  } else {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
}
