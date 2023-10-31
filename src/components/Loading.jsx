import loading from '../images/loading.gif';
import { useState, useEffect } from 'react';
import HashLoader from 'react-spinners/ClipLoader'; // Import ClipLoader from 'react-spinners'

const Loading = () => {
    const [loading, setLoading] = useState(true); // Initialize loading as true

    useEffect(() => {
        setTimeout(() => {
            setLoading(false); // Set loading to false after 5000 milliseconds (5 seconds)
        }, 5000);
    }, []);

    const override = `
        display: block;
        margin: 0 auto;
    `;

    return (
        <HashLoader class="loading" color="red" loading={loading} css={override} size={100} /> // Use "loading" from state
    );
}

export default Loading;

