import React, { useState, useEffect } from "react";
//import firebase from "./components/firebase";
import GamePage from "./GamePage";
import Cookies from "js-cookie";
import joinuser from "./components/joinuser";
import checkifexits from "./components/checkifexists";
import "./MainPage.css";

export default function MainPage() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    if (id != null) {
      setSumbitRoomNumber(true);
    }
  }, []);
  const [roomdoesntexist, setRoomDoesntexist] = useState("");
  const [inputroomnumber, setInputroomnumber] = useState();
  const [submiroomnumber, setSumbitRoomNumber] = useState(false);
  const handleChange = (e) => {
    setInputroomnumber(e.target.value);
    e.preventDefault();
  };
  return (
    <div>
      {submiroomnumber === true ? (
        <GamePage />
      ) : (
        <div className="mainpage-container">
          <div className="container">
            <div className="mainpagelabel">
              Scrum Poker <i className="far fa-hand-peace"></i>
            </div>
            <div className="inputroom input-group">
              <input
                placeholder="Enter the room id"
                className=" form-control"
                type="text"
                value={inputroomnumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                className="mainpagebutton btn btn-primary"
                onClick={joinGamePage}
              >
                Join room
              </button>

              <button
                className="mainpagebutton btn btn-primary"
                onClick={() => createGamePage()}
              >
                Create Room
              </button>
            </div>
            {/* <button
            onClick={() =>
              checkifexits(inputroomnumber).then((value) => console.log(value))
            }
          >
            functiontest
          </button> */}
            <div>{roomdoesntexist}</div>
          </div>
        </div>
      )}
    </div>
  );

  function createGamePage() {
    const random = Math.floor(Math.random() * (10000 - 1000) + 1000);
    Cookies.set("username", "master");
    Cookies.set("yourroom", "room" + random);
    window.location.href = `/?id=${random}`;
  }

  async function joinGamePage() {
    await checkifexits(inputroomnumber).then(async (value) => {
      if (value === true) {
        setSumbitRoomNumber(true);
        window.location.href = `/?id=${inputroomnumber}`;
      } else {
        setRoomDoesntexist("Room Doesn't exist");
      }
    });
  }
}
