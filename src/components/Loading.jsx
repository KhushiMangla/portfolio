import { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; // Import ClipLoader from 'react-spinners'

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
        <ClipLoader class="loading" color="#ff9248" loading={loading} css={override} size={100} /> // Use "loading" from state
    );
}

export default Loading;
