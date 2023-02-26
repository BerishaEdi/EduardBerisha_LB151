import React, { useState, useEffect } from 'react'
import { auth, db } from "../firebase";

const Home = () => {
  const [word, setWord] = useState("");
  const [wordsArray, setWordsArray] = useState([]);
  const [hint, setHint] = useState('');
  const [inputValue, setInputValue] = useState('')
  const [correct, setCorrect] = useState(false);
  const [guthaben, setGuthaben] = useState(500)


  useEffect(() => {
    loadWords();
  }, [])

  const loadWords = () => {
    db.collection("words")
      .get()
      .then((querySnapshot) => {
        const newWordsArray = [];
        querySnapshot.forEach((doc) => {
          newWordsArray.push({
            word: doc.data().name,
            hint: doc.data().hint
          });
        });
        setWordsArray(newWordsArray);
        getRandomWord(newWordsArray);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  const getRandomWord = (array) => {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    const firstWord = shuffledArray[0].word;
    const firstHint = shuffledArray[0].hint;
    setWord(firstWord);
    setHint(firstHint);
    setInputValue('');
    setCorrect(false);
    console.log(firstWord);
  };

  const checkAnswer = (e) => {
    e.preventDefault();
    setGuthaben(guthaben - 50);
    const guess = e.target[0].value.trim();
    const isCorrect = guess === word;
    const message = isCorrect ? 'Richtig! Du hast 100 Guthaben gewonnen. Möchtest du eine neue Runde starten?' : 'Leider falsch. Möchtest du einen neue Runde starten';
    const shouldStartNewRound = window.confirm(message);
    if (shouldStartNewRound) {
      handleNewRound();
      if (isCorrect) {
        setGuthaben(guthaben + 100);
      }
    } else {
      if (isCorrect) {
        setGuthaben(guthaben + 100);
      }
      setInputValue('');
      setCorrect(isCorrect);
    }
  }


  const handleNewRound = () => {
    getRandomWord(wordsArray);
    setInputValue('');
    setCorrect(false);
  }


  return (
    <div className='Home'>
      <p>Spiel</p>
      <div className='gameDiv'>
        <form onSubmit={checkAnswer}>
          <input type='text' placeholder='Gib hier dein Wort ein' />
          <button>Prüfen</button>
        </form>
        <p>Tipp: {hint}</p>
        <p>Gutgaben: {guthaben}</p>
      </div>
    </div>
  )
}


export default Home