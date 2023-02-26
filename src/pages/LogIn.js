import React, { useState } from 'react'
import { auth } from '../firebase'
import { useNavigate } from "react-router-dom";

const LogIn = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    const handleLogin = event => {
        event.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Eingelogt:', user.email);
                navigate("/AdminPage");

            })
            .catch(error => alert(error.message))
    }


    const goToHome = () => {
        navigate("/Home")
    }


    const goToHighscore = () => {
        navigate("/Highscore")
      }


    return (
        <div className='Login'>
            <div className='HighscoreButton'>
                <button onClick={goToHighscore}>Gehe zur Leaderboard</button>
            </div>
            <p>LogIn</p>
            <div className="form">
                <form onSubmit={handleLogin}>
                    <div className='Logininput' style={{ marginTop: "5%" }}>
                        <label>Email</label>
                        <br />
                        <input type="text" name="email" onChange={e => setEmail(e.target.value)} required />
                        <br />
                        <label>Passwort</label>
                        <br />
                        <input type="password" name="password" onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button
                        type='submit'
                        title='Anmelden'
                        color='white'
                    >Anmelden</button>
                </form>
                <p style={{fontSize: "1rem"}}>Admin Login = admin@info.ch Pw = admin123</p>
            </div>
            <div>
                <button
                    className='GuestButton'
                    type='submit'
                    title='Gast'
                    color='white'
                    onClick={goToHome}
                >Als Gast fortfahren</button>
            </div>

        </div>

    )
}

export default LogIn