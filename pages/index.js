import { AceBase } from "acebase";
import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home(props) {
  const [apiBodyText, setApiBodyText] = useState("");
  const [testText, setTestText] = useState(props.snapTestVal);
  const [itemTitle, setItemTitle] = useState("");
  const [itemText, setItemText] = useState("");
  const [itemList, setItemList] = useState(props.itemList);
  //update post hooks
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [successPopUp, setSuccessPopUp] = useState(false);

  function handleUpdateItem(id) {
    event.preventDefault();
    axios
      .post("/api/updateItem", {
        id: id,
        title: title,
        text: text,
      })
      .then((response) => {
        setItemList(response.data.itemList);
        setSuccessPopUp(true);
        setTimeout(() => {
          setSuccessPopUp(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleFormSend() {
    event.preventDefault();

    axios
      .post("/api/posts", {
        text: apiBodyText,
      })
      .then((response) => {
        setTestText(response.data.snapVal);
        setSuccessPopUp(true);
        setTimeout(() => {
          setSuccessPopUp(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleAddListItem() {
    event.preventDefault();
    axios
      .post("/api/addItem", {
        id: uuidv4(),
        title: itemTitle,
        text: itemText,
      })
      .then((response) => {
        setItemList(response.data.itemList);
        setSuccessPopUp(true);
        setTimeout(() => {
          setSuccessPopUp(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleRemoveItem(id) {
    event.preventDefault();
    axios
      .post("/api/removeItem", {
        id: id,
      })
      .then((response) => {
        setItemList(response.data.itemList);
        setSuccessPopUp(true);
        setTimeout(() => {
          setSuccessPopUp(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <main className="h-screen flex-col flex w-3/4 m-auto gap-3 p-10">
      <div
        className={
          successPopUp
            ? "fixed transition-opacity ease-in-out opacity-100 p-3 text-black bg-green-500 font-bold font-mono rounded-md left-24"
            : "fixed transition-opacity ease-in-out opacity-0 p-3 text-black bg-green-500 font-bold font-mono rounded-md left-24"
        }
      >
        Success!
      </div>
      <section className="dark:text-white dark:bg-zinc-900 font-bold text-2xl rounded-2xl px-5 py-3 w-max bg-white">
        <h1 className="font-mono">AceBase</h1>
      </section>
      <section className="flex gap-3 flex-wrap">
        <section>
          <section className="bg-white dark:bg-zinc-900 gap-3 flex flex-col items-center p-8 shadow-xl shadow-zinc-400 dark:shadow-black w-max h-max rounded-2xl">
            <form
              onSubmit={() => {
                handleFormSend();
              }}
              className="flex flex-col gap-3"
              action=""
            >
              <input
                placeholder="Type something here"
                className="border-2 dark:border-zinc-700 dark:text-white dark:placeholder-zinc-700 dark:bg-zinc-900 p-1 rounded-md"
                type="text"
                onChange={() => {
                  setApiBodyText(event.target.value);
                }}
              />
              <button
                type="submit"
                className="px-3 py-1 bg-green-400 rounded-md"
              >
                Send
              </button>
            </form>
            <div className="dark:text-white px-3 py-1 dark:bg-zinc-800 rounded-md">
              {testText}
            </div>
          </section>
        </section>
        <section className="text-white flex flex-col gap-3 bg-zinc-900 w-max h-max p-8 rounded-2xl">
          <span className="font-bold font-mono">Add items to list</span>
          <form
            onSubmit={() => {
              handleAddListItem();
            }}
            className="flex flex-col gap-3"
            action=""
          >
            <input
              placeholder="Title"
              className="border-2 dark:border-zinc-700 dark:text-white dark:placeholder-zinc-700 dark:bg-zinc-900 p-1 rounded-md"
              type="text"
              onChange={() => {
                setItemTitle(event.target.value);
              }}
            />
            <input
              placeholder="Text"
              className="border-2 dark:border-zinc-700 dark:text-white dark:placeholder-zinc-700 dark:bg-zinc-900 p-1 rounded-md"
              type="text"
              onChange={() => {
                setItemText(event.target.value);
              }}
            />
            <button type="submit" className="px-3 py-1 bg-green-400 rounded-md">
              Send
            </button>
          </form>
        </section>
        <section className="text-white p-8 bg-zinc-900 rounded-2xl w-max h-max">
          <span className="font-bold font-mono">Item List</span>
          <div className="flex h-96 overflow-y-scroll sc3 flex-col gap-1">
            {itemList.map((data) => (
              <div className="" key={data.id}>
                <form
                  className="p-2 flex gap-1 flex-col bg-zinc-800 rounded-md"
                  onSubmit={() => {
                    handleRemoveItem(data.id);
                  }}
                  action=""
                >
                  Title:
                  <input
                    className="bg-transparent"
                    placeholder={data.title}
                    type="text"
                    onChange={() => {
                      setTitle(event.target.value);
                    }}
                  />
                  <br />
                  Text:
                  <input
                    className="bg-transparent"
                    placeholder={data.text}
                    type="text"
                    onChange={() => {
                      setText(event.target.value);
                    }}
                  />
                  <br />
                  <button
                    onClick={() => {
                      handleUpdateItem(data.id);
                    }}
                    className="p-1  border-yellow-600 border-2 rounded-md"
                  >
                    Update
                  </button>
                  <button
                    type="submit"
                    className="p-1  border-red-600 border-2 rounded-md"
                  >
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export async function getServerSideProps(context) {
  const db = new AceBase("mydb"); // Creates or opens a database with name "mydb"
  const snapTest = await db.ref("test/text").get();
  const snapTestVal = snapTest.val();

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

  // const itemListVal = itemList.val();
  return {
    props: { snapTestVal, itemList }, // will be passed to the page component as props
  };
}
