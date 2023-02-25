import React, { useState, useEffect } from 'react'
import { auth, db } from "../firebase";
import * as firebase from "firebase";
const dbRef = db.collection("users");


const AdminPage = () => {


    const [wordsArray, setWordsArray] = useState([]);




    useEffect(() => {
        setWordsArray([])
        loadWords()
    }, [])



    const loadWords = () => {
        db.collection("words")
            .get()
            .then((querySnapshot) => {
                const newWordsArray = [];
                querySnapshot.forEach((doc) => {
                    newWordsArray.push({
                        id: doc.id,
                        word: doc.data().name,
                    });
                });
                setWordsArray(newWordsArray);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };



    const handleClick = (wordId) => {
        console.log(`Button for word with ID ${wordId} was clicked.`);
        if (window.confirm(`Are you sure you want to delete the word with ID ${wordId}?`)) {
            db.collection("words")
              .doc(wordId)
              .delete()
              .then(() => {
                console.log(`Word with ID ${wordId} was deleted successfully.`);
                // Refresh the list of words to reflect the deletion
                loadWords();
              })
              .catch((error) => {
                console.error(`Error deleting word with ID ${wordId}:`, error);
              });
          }
      };

    return (
        <div className='Admin'>
            <p>Admin Verwaltung</p>
            <div className="wordRenderDiv">

                {wordsArray.map((word) => (
                    <p key={word.id}>
                        <button className='wordRender' onClick={() => handleClick(word.id)}>{word.word}</button>
                    </p>
                ))}
            </div>
        </div>
    )
}

export default AdminPage