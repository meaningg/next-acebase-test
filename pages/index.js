import { AceBase } from "acebase";
import axios from "axios";
import { useState } from "react";

export default function Home(props) {
  const [apiBodyText, setApiBodyText] = useState("");
  const [testText, setTestText] = useState(props.snapVal);

  function handleFormSend() {
    event.preventDefault();

    axios
      .post("/api/posts", {
        text: apiBodyText,
      })
      .then((response) => {
        setTestText(response.data.snapVal);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <main className="h-screen flex w-3/4 m-auto p-10">
      <section className="bg-white gap-3 flex p-16 shadow-xl shadow-zinc-400 w-full h-full rounded-2xl">
        <section>
          <form
            onSubmit={() => {
              handleFormSend();
            }}
            className="flex flex-col gap-3"
            action=""
          >
            <input
              placeholder="Type something here"
              className="border-2 p-1 rounded-md"
              type="text"
              onChange={() => {
                setApiBodyText(event.target.value);
              }}
            />
            <button type="submit" className="px-3 py-1 bg-green-400 rounded-md">
              Send
            </button>
          </form>
        </section>
        <section>{testText}</section>
      </section>
    </main>
  );
}

export async function getServerSideProps(context) {
  const db = new AceBase("mydb");
  const snap = await db.ref("test/text").get();
  const snapVal = snap.val();
  return {
    props: { snapVal }, // will be passed to the page component as props
  };
}
