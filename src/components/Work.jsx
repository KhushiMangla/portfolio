import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Splash from './Splash'; // Import the Splash component
import aos from 'aos';
import 'aos/dist/aos.css';

const Work = ({ restBase, featuredImage }) => {
    const restPath = restBase + 'work?_embed&acf_format=standard';
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
                setTimeout(() => {
                    // setLoadStatus(true);
                    setShowSplash(false);
                }, 1000); // Hide the splash screen when data is loaded
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPath]);
    useEffect(() => {
        aos.init();
    })

    return (
        <>
            {showSplash ? (
                <Splash />
            ) : isLoaded ? (
                <>
                    <div>All Projects</div>
                    <div className="project-container"
                        data-aos="fade-up"
                        data-aos-duration="1200"
                    >
                        {restData.map((post) => (
                            <article key={post.id} id={`post-${post.id}`}>
                                <div className="project">
                                    <Link to={`/work/${post.slug}`}>
                                        <div className="project-work-container">
                                            <div className="project-title">{post.title.rendered}</div>
                                            <img className="project-img" src={post.acf.project_img} alt="project image" />
                                        </div>
                                        <div className="project-text">{post.acf.card_text}</div>
                                        <button
                                            className="read-more-btn btn"
                                            aria-label={`Read more about ${post.title.rendered}`}
                                        >
                                            <p>{post.acf.read_more}</p>
                                        </button>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Work;
