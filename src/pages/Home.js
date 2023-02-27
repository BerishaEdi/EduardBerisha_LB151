import React, { useState, useEffect } from 'react'
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [word, setWord] = useState("");
  const [wordsArray, setWordsArray] = useState([]);
  const [hint, setHint] = useState('');
  const [inputValue, setInputValue] = useState('')
  const [correct, setCorrect] = useState(false);
  const [guthaben, setGuthaben] = useState(500)
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const [lives, setLives] = useState(3);

  useEffect(() => {
    if (!userName) {
      const name = prompt("Bitte gib deinen Namen ein:");
      setUserName(name);
      console.log(name)
      saveUserInDB(name)
    }
    loadWords();
  }, [])

/* Der Username wird in der Db gespeichert */
  const saveUserInDB = (userName) => {
    db.collection("users")
      .doc(userName)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          db.collection("users")
            .doc(userName)
            .set({ name: userName })
            .then(() => {
              console.log("User added");
            })
            .catch((error) => {
              console.error("Error adding user", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking if user exists", error);
      });
  };


  /* Hier werden alle Wörtert und die Tipps aus der Db geladen und in einem Array gespeichert */
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

  /* Random Wort wird aus dem Array genommen */
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

  /* Es wird überprüft ob die Antwort richtig ist und dementsprechend wird gewinn ausgezahlt oder nur gebühr entnommen */
  const checkAnswer = (e) => {
    e.preventDefault();
    if (guthaben !== 0) {
    setGuthaben(guthaben - 50)
    const guess = e.target[0].value.trim()
    const isCorrect = guess === word
    const message = isCorrect ? 'Richtig! Du hast 100 Guthaben gewonnen. Möchtest du eine neue Runde starten?' : 'Leider falsch. Möchtest du einen neue Runde starten';
    const shouldStartNewRound = window.confirm(message);
    if (shouldStartNewRound) {
      handleNewRound()
      if (isCorrect) {
        setGuthaben(guthaben + 100);
      }
    } else {
      if (isCorrect) {
        setGuthaben(guthaben + 100);
      }
      setInputValue('')
      setCorrect(isCorrect)
    }
    console.log(guthaben)
  }else {
    window.alert("Du hast kein Guthaben zum Gambeln")
  }
  }


  const handleNewRound = () => {
    getRandomWord(wordsArray);
    setInputValue('');
    setCorrect(false);
  }



  const payout = () => {
    navigate("/")
    saveHighscore()
  }


  /* Der Score des Users wird beim Payout in die Db gespeichert */
  const saveHighscore = () => {
    db.collection("users")
      .doc(userName)
      .update({ guthaben: guthaben })
      .catch((error) => {
        console.log("Error updating document: ", error)
      })
  }



/* Hier wird die Funktion des Glücksrad geregelt. */
  const handleButtonClick = () => {
    if (guthaben !== 0) {
      const randomNum = Math.floor(Math.random() * 5);
      switch (randomNum) {
        case 0:
          setGuthaben(guthaben => guthaben * 2);
          break;
        case 1:
          setGuthaben(0);
          break;
        case 2:
          setGuthaben(guthaben => guthaben + 100);
          break;
        case 3:
          setGuthaben(guthaben => guthaben - 50);
          break;
        case 4:
          setGuthaben(0);
          break;
        default:
          break;
      }
    } else {
      window.alert("Du hast kein Guthaben zum Gambeln")
    }
  }


  const goToHighscore = () => {
    navigate("/Highscore")
  }




  return (
    <div className='Home'>
      <div className='HighscoreButton'>
        <button onClick={goToHighscore}>Gehe zur Leaderboard</button>
      </div>
      <p>Spiel</p>
      <div className='gameDiv'>
        <form onSubmit={checkAnswer}>
          <input type='text' placeholder='Gib hier das Wort ein' />
          <br />
          <button>Prüfen</button>
        </form>
        <p>Tipp: {hint}</p>
        <p>Guthaben: {guthaben}</p>
        <p>Leben: {lives}</p>
        <button className="GambleButton" onClick={handleButtonClick}>Dreh am Rad</button>
        <br />
        <button
          className='PayOutButton'
          type='submit'
          title='payout'
          color='white'
          onClick={payout}
        >Auszahlen</button>
      </div>
    </div>
  )
}


export default Home