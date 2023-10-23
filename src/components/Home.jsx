import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import Work from './Work'; // Import the Work component

const Home = ({ restBase }) => {
    const restPath = restBase + 'pages/10';
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPath]);

    return (
        <>
            {isLoaded ? (
                <article id={`post-${restData.id}`}>
                    <h1>{restData.title.rendered}</h1>
                    <div className="entry-content">
                        <section>
                            <div dangerouslySetInnerHTML={{ __html: restData.content.rendered }} />
                        </section>
                        <section className="toolkit">
                            {restData.acf.toolkit.map((tool, index) => (
                                <p key={index}>{tool.toolkit}</p>
                            ))}
                        </section>
                    </div>

                    {/* Render the Work component after the Home content */}
                    <Work restBase={restBase} />
                    {/* social media icons */}
                    <section className="social-media-icons">
                        <a href={`mailto:${restData.acf.email}`}>
                            <span className="icon-wrapper">
                                <FaEnvelope />
                            </span>
                        </a>
                        <a href={restData.acf.linkedin}>
                            <span className="icon-wrapper">
                                <FaLinkedin />
                            </span>
                        </a>
                        <a href={restData.acf.github}>
                            <span className="icon-wrapper">
                                <FaGithub />
                            </span>
                        </a>
                    </section>
                </article>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Home;
