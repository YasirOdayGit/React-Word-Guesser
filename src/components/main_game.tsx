import React, { useEffect, useRef, useState } from "react";
import { words, allowedKey } from "../config/words";
import { randomInt } from "../utils/utils";
import "./main_game.scss";
type Props = {};
const MainGame = (props: Props) => {
  const singleWord = useRef<string>(words[randomInt(0, words.length)]);
  const stage = useRef<number>(0);
  const tries = useRef<number>(0);
  const winTries = useRef<number>(0);
  const [, setRefresh] = useState<boolean>(true);
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      //   alert(e.which);
      if (
        winTries.current === 5 ||
        stage.current + tries.current === 25 ||
        !allowedKey.includes(e.key)
      )
        return;

      const element = document.getElementById(
        "guess" + (tries.current + stage.current)
      );
      //   return;
      // we know it will not be a null so it's aight
      element!.innerHTML = e.key;
      element!.setAttribute("hascontent", "true");
      if (singleWord.current.charAt(tries.current) === e.key) {
        element?.classList.add("correct");
        winTries.current++;
      } else {
        if (singleWord.current.includes(e.key)) {
          element?.classList.add("almost");
        } else {
          element?.classList.add("false");
        }
      }

      if (winTries.current === 5 || stage.current + tries.current === 24) {
        setRefresh((old) => !old);
        return;
      }
      tries.current++;

      if (tries.current === 5) {
        stage.current += 5;
        tries.current = 0;
        winTries.current = 0;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="maincontent">
      <div className="wordscontainer">
        <h1>React Word Guesser</h1>
        {/* <h1>{singleWord.current}</h1> */}

        <div className="row">
          <p id="guess0" className="card" />
          <p id="guess1" className="card" />
          <p id="guess2" className="card" />
          <p id="guess3" className="card" />
          <p id="guess4" className="card" />
        </div>
        <div className="row">
          <p id="guess5" className="card" />
          <p id="guess6" className="card" />
          <p id="guess7" className="card" />
          <p id="guess8" className="card" />
          <p id="guess9" className="card" />
        </div>
        <div className="row">
          <p id="guess10" className="card" />
          <p id="guess11" className="card" />
          <p id="guess12" className="card" />
          <p id="guess13" className="card" />
          <p id="guess14" className="card" />
        </div>
        <div className="row">
          <p id="guess15" className="card" />
          <p id="guess16" className="card" />
          <p id="guess17" className="card" />
          <p id="guess18" className="card" />
          <p id="guess19" className="card" />
        </div>
        <div className="row">
          <p id="guess20" className="card" />
          <p id="guess21" className="card" />
          <p id="guess22" className="card" />
          <p id="guess23" className="card" />
          <p id="guess24" className="card" />
        </div>
        {/* {/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
          navigator.userAgent
        ) && (
          <input
            type="text"
            id="keyboard"
            // onChange={() => {}}
            placeholder="open keyboard"
          />
        )} */}
        {winTries.current === 5 && <h2>WINNER</h2>}
        {/* {tries.current + stage.current} */}
        {tries.current + stage.current === 24 && <h3>THATS NOT IT {":("}</h3>}
        {tries.current + stage.current === 24 && (
          <button
            onClick={() => {
              tries.current = 0;
              stage.current = 0;
              winTries.current = 0;
              singleWord.current = words[randomInt(0, words.length)];
              for (var i = 0; i < 25; i++) {
                const element = document.getElementById("guess" + i)!;
                element!.innerHTML = "";
                element!.removeAttribute("hascontent");
                element!.removeAttribute("hascontent");
                element.classList.remove("success");
                element.classList.remove("false");
                element.classList.remove("almost");
              }
              setRefresh((old) => !old);
            }}
          >
            play again
          </button>
        )}
      </div>
    </div>
  );
};

export default MainGame;
