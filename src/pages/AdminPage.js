import React, { useState, useEffect } from 'react'
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import * as firebase from "firebase";



const AdminPage = () => {


    const [wordsArray, setWordsArray] = useState([]);
    const [newWord, setNewWord] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        setWordsArray([])
        loadWords()
    }, [])


/* Diese Funktion nimmt alle Wörter und Tipps aus der Datenbank und speichert sie in einem Array der auf den Bildischrm gerendert wird. */
    const loadWords = () => {
        db.collection("words")
            .get()
            .then((querySnapshot) => {
                const newWordsArray = [];
                querySnapshot.forEach((doc) => {
                    newWordsArray.push({
                        id: doc.id,
                        word: doc.data().name,
                        hint: doc.data().hint
                    });
                });
                setWordsArray(newWordsArray);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };



    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                console.log("User logged out successfully");
                navigate("/");
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    };




    const handleSubmit = (event) => {
        event.preventDefault();
        addWord(newWord);
        setNewWord("");
    };


    /* Hier wird ein neues Wort in der Datenbank eingefügt*/
    const addWord = (newWord) => {
        db.collection("words")
            .add({
                name: newWord,
            })
            .then((docRef) => {
                loadWords();
            })
            .catch((error) => {
                console.error("Error:", error);
            })
    }


    /* Hier wird das löschen vcn einem Wort geregelt.*/
    const handleClick = (wordId) => {
        console.log(`Button for word with ID ${wordId} was clicked.`);
        if (window.confirm(`Bist du sicher du willst das Wort mit der ID: ${wordId} löschen?`)) {
            db.collection("words")
                .doc(wordId)
                .delete()
                .then(() => {
                    console.log(`Wort mit ID ${wordId} wurde gelöscht`);
                    loadWords();
                })
                .catch((error) => {
                    console.error(`Error deleting word ID ${wordId}:`, error);
                })
        }
    }



    
    const deleteLeaderboard = () => {
        const collectionRef = db.collection("users");
        const batchSize = 50;
      
        return new Promise((resolve, reject) => {
          deleteQueryBatch(collectionRef, batchSize, resolve, reject);
        });
      }



      /* Zusammen mit der Funktion deleteLeaderboard() die Rangliste und alle Spieler aus der Datenbank gelöscht*/
      const deleteQueryBatch = (query, batchSize, resolve, reject) => {
        query
          .limit(batchSize)
          .get()
          .then((snapshot) => {
            if (snapshot.size === 0) {
              return 0;
            }
      
            const batch = db.batch();
            snapshot.docs.forEach((doc) => {
              batch.delete(doc.ref);
            });
      
            return batch.commit().then(() => {
              return snapshot.size;
            });
          })
          .then((numDeleted) => {
            if (numDeleted === 0) {
              resolve();
              return;
            }
      
            process.nextTick(() => {
              deleteQueryBatch(query, batchSize, resolve, reject);
            });
          })
          .catch(reject);
      };
      




    return (
        <div className='Admin'>
            <div className='LogoutButton'>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <p>Admin Verwaltung</p>
            <button className="deleteLeaderBoard" onClick={deleteLeaderboard}>Leaderboard wieder auf Null setzen</button>
            <div className="addWord">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={newWord}
                        onChange={(event) => setNewWord(event.target.value)}
                        placeholder="Neues Wort hinzufügen"
                    />
                    <button type="submit" className='addButton'>Hinzufügen</button>
                </form>
            </div>
            <div className="wordRenderDiv">
                {wordsArray.map((word) => (
                    <p key={word.id}>
                        <button className='wordRender' onClick={() => handleClick(word.id)}>{word.word}</button>
                        <span className='wordHint'>Tipp: {word.hint}</span>
                    </p>
                ))}
            </div>
        </div>
    )
}

export default AdminPage