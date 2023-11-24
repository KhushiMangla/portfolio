import React, { useEffect } from "react";

const Joke = () => {
    const [Joke, setJoke] = React.useState("");

    const fetchApi = () => {
        fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single")
            .then((res) => res.json())
            .then((data) => setJoke(data.joke));
    };
    // useEffect(() => {
    //     // Fetch a joke when the component mounts
    //     fetchApi();
    // }, []);

    return (
        <div className="joke_wrapper">
            <div className="joke_heading">Laugh with Me: Latest Jokes Await! 😄</div>
            <button className="btn joke_btn" onClick={fetchApi}>
                <p> Press for a Smile!</p>
            </button>
            <p className="joke_text">{Joke}</p>

        </div >
    );
}

export default Joke;