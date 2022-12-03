import { useState, useEffect } from "react"
import styles from "./Home.module.css"

import encode from '../utils/encode.mjs'

const sampleObj = {
    "website": "Spotify",
    "username": "username",
    "password": "password"
}

const Home = () => {
    const [enteredPassword, setEnteredPassword] = useState("")

    const passwordChangeHandler = (e) => {
        setEnteredPassword(e.target.value)
    };

    const formSubmitHandler = (e) => {
        e.preventDefault() // prevents page from reloading

        // TODO: form validation - empty input
        // redirectToPage(password) // seems dangerous to do this???
    }

    return (
        <>
            <input
                type="password"
                className={`${styles.input} ${styles.centered}`}
                onChange={passwordChangeHandler}
            />
            <span className={styles.centered2}>{enteredPassword}</span>
        </>
    )
}

export default Home