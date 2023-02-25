import React, { useState } from 'react'
import { auth } from '../firebase'


const LogIn = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const handleLogin = event => {
        event.preventDefault(); 
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Eingelogt:', user.email);

            })
            .catch(error => alert(error.message))
    }




    return (
        <div className='Login'>
            <p>LogIn</p>
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
        </div>

    )
}

export default LogIn