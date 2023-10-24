import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import Work from './Work'; // Import the Work component
import { NavLink } from 'react-router-dom';

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
                    <div className='intro'>
                        <div className="intro-left">
                            <section className="name">
                                <h3>{restData.acf.intro}</h3>
                            </section>
                            <section className="tagline">{restData.acf.tagline}</section>
                            <button className="mywork-btn">
                                <NavLink activeClassName="active" to="/work">View my work</NavLink>
                            </button>
                        </div>
                        <section className="profile">
                            <div dangerouslySetInnerHTML={{ __html: restData.content.rendered }} />
                        </section>

                    </div>


                    {/* Rendering work component */}
                    <div className="custom__scroll">
                        <a href="#work" className="work-scroll">
                            <div className="scroll"></div>
                        </a>
                    </div>
                    <section id="work">
                        <Work restBase={restBase} />
                    </section>

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
