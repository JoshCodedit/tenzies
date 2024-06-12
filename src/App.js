import React from "react";
import Die from "./Die";
import Confetti from "react-confetti"

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(0)

  React.useEffect(() => {
    const isTenzies = dice.every((die) => die.value === dice[0].value && die.isHeld === true);
    setTenzies(isTenzies);
    if (tenzies === true) {
      console.log("You Win");
    }
  }, [dice]);

  function allNewDice() {
    let die = [];
    for (let i = 0; i < 10; i++) {
      die.push({ value: Math.floor(Math.random() * 6) + 1, isHeld: false });
    }
    return die;
  }


  function countRolls(){
  setRolls(prev => rolls + 1)
  console.log(rolls)
 }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die, i) =>
        die.isHeld ? die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
      )
    );
  }

  function newGame(){
    setTenzies(false)
    setDice(allNewDice())
    setRolls(0)
  }

  function holdDice(index) {
    setDice((prevDice) =>
      prevDice.map((die, i) =>
        i === index ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const randomDice = dice.map((die, index) => {
    return (
      <Die
        key={index}
        value={die.value}
        isHeld={die.isHeld}
        onClick={() => holdDice(index)}
      />
    );
  });

  function handleButton(){
    if(tenzies === false){
      rollDice()
      countRolls()
    }else{
      newGame()
    }
  }

  return (
<main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {randomDice}
            </div>
            <button 
                className="roll-dice" 
                onClick={handleButton}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <h3>Your Score:</h3>
            <h2>{rolls}</h2>
        </main>
  );
}
