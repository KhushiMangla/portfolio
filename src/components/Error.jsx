import React, { useState, useEffect } from 'react';
import errorImage from '../images/error.png';
import { NavLink } from 'react-router-dom';

const Error = ({ restBase }) => {
    const [pageData, setPageData] = useState(null);
    const restPath = restBase + 'pages/330?_embed&acf_format=standard';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(restPath);
                const data = await response.json();
                setPageData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [restPath]);

    return (
        <div className="error__container">
            <NavLink className="err_link" to="/">
                <img
                    className='error__img'
                    src={pageData?.acf?.error_img}
                    alt="error"
                />
                <button className='btn error__btn'>
                    <p>Go back</p>
                </button>
            </NavLink>
        </div>
    );
}

export default Error;
