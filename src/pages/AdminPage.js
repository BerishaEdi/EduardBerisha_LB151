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


    const addWord = (newWord) => {
        db.collection("words")
            .add({
                name: newWord,
            })
            .then((docRef) => {
                console.log("New word added with ID:", docRef.id);
                // Refresh the list of words to reflect the addition
                loadWords();
            })
            .catch((error) => {
                console.error("Error adding word:", error);
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
                    loadWords();
                })
                .catch((error) => {
                    console.error(`Error deleting word with ID ${wordId}:`, error);
                });
        }
    };

    return (
        <div className='Admin'>
            <div className='LogoutButton'>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <p>Admin Verwaltung</p>
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
                    </p>
                ))}
            </div>
        </div>
    )
}

export default AdminPage