import { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const fisrtValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === fisrtValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      if (tenzies) {
        setDice(allNewDice());
        setTenzies(false);
      }
    }
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  const diceElements = dice.map((die) => {
    return (
      <div key={die.id}>
        <Die
          value={die.value}
          isHeld={die.isHeld}
          holdDice={() => holdDice(die.id)}
        />
      </div>
    );
  });

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die;
      })
    );
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="main">{diceElements}</div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
