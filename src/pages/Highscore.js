import React, { useState, useEffect } from 'react'
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";



const Highscore = () => {
    const [playerScores, setPlayerScores] = useState([])
    const navigate = useNavigate()



/* Hier werden die Spieler mit ihrem dazugehörigen Highscore aus der Datenbank gelesen und 
in einem Array gespeichert sortiert nach der Höhe des Highscores */
    useEffect(() => {
        const unsubscribe = db.collection("users")
            .orderBy("guthaben", "desc")
            .onSnapshot((snapshot) => {
                const scores = snapshot.docs.map((doc, index) => ({
                    rank: index + 1,
                    name: doc.data().name,
                    guthaben: doc.data().guthaben
                }))
                setPlayerScores(scores)
            });

        return () => {
            unsubscribe()
        }
    }, [])


    const goToLogIn = () => {
        navigate("/")
      }

    return (
        <div className='Highscore'>
            <div className='backToLogIn'>
                <button onClick={goToLogIn}>Zurück zum Start</button>
            </div>
            <h2>Leaderboard</h2>
            <table className="HighscoreTable">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Guthaben</th>
                    </tr>
                </thead>
                <tbody>
                    {playerScores.map((player) => (
                        <tr key={player.name}>
                            <td>{player.rank}</td>
                            <td>{player.name}</td>
                            <td>{player.guthaben}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Highscore
