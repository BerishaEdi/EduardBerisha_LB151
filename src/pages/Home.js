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

  const getRandomWord = (array) => {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    const firstWord = shuffledArray[0].word;
    setWord(firstWord);
    console.log(firstWord);
  }

  return (
    <div className='Home'>
      <p>Home</p>
      <p>Random Word: {word}</p>
    </div>
  )
}


export default Home