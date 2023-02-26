import React, { useState, useEffect } from 'react'
import { auth, db } from "../firebase";

const Home = () => {
  const [word, setWord] = useState("");
  const [wordsArray, setWordsArray] = useState([]);

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
          });
        });
        setWordsArray(newWordsArray);
        getRandomWord(newWordsArray);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  const getRandomWord = () => {
    const shuffledArray = wordsArray.sort(() => Math.random() - 0.5);
    const firstWord = shuffledArray[0].word;
    const shuffledWord = shuffleWord(firstWord);
    setWord(shuffledWord);
    console.log(shuffledWord);
  }

  const shuffleWord = (word) => {
    let shuffledWord = '';
    const wordArray = word.split('');
    while (wordArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * wordArray.length);
      shuffledWord += wordArray[randomIndex];
      wordArray.splice(randomIndex, 1);
    }
    return shuffledWord;
  }


  return (
    <div className='Home'>
      <p>Home</p>
      <p>{word}</p>
    </div>
  )
}


export default Home