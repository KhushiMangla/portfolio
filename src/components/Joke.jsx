import React from "react";
// import Button from "./Button";
// import './Joke.css';

const Joke = () => {
    const [joke, setJoke] = React.useState(""); // Changed the variable name to avoid conflict

    const fetchApi = () => {
        fetch("https://sv443.net/jokeapi/v2/joke/Programming?type=single&blacklistFlags=nsfw")
            .then((res) => res.json())
            .then((data) => setJoke(data.joke));
    };

    return (
        <div className="joke">
            <div className="joke-heading">Don't Miss the Fun!</div>
            <span>&#128514;</span>
            {/* <Button callApi={fetchApi} /> */}
            <button
                className="btn"
                onClick={fetchApi} // Call the fetchApi function directly
            >
                <p>Get a Random Joke</p>
            </button>

            <p>{joke}</p>
        </div>
    );
}

export default Joke;
