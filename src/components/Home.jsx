import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import Featured from './Featured'; // Import the Work component
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll'; // Import Link from react-scroll
import { motion } from "framer-motion"

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

    const introVariants = {
        initial: {
            x: -500,
            opacity: 0,
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 1,
                staggerChildren: 0.1,
            }
        },
    };

    return (
        <div className="home-container">
            {isLoaded ? (
                <article id={`post-${restData.id}`}>
                    <div className="intro-scroll-container" style={{ height: '80vh' }}>
                        <div className='intro'>
                            <motion.div className="intro-left" variants={introVariants} initial="initial" animate="animate">
                                <motion.section className="name" variants={introVariants}>
                                    <div>{restData.acf.intro}</div>
                                </motion.section>
                                <motion.section className="tagline" variants={introVariants}>
                                    <p>{restData.acf.tagline}</p>
                                </motion.section>
                                <motion.section>
                                    <motion.button className="mywork-btn" variants={introVariants}>
                                        <Link to="work" smooth={true} duration={500}> {/* Use Link from react-scroll */}
                                            View my work
                                        </Link>
                                    </motion.button>
                                </motion.section>
                            </motion.div>
                            <section className="profile">
                                <div dangerouslySetInnerHTML={{ __html: restData.content.rendered }} />
                            </section>
                        </div>

                        {/* Rendering work component */}
                        <div className="custom__scroll">
                            <a href="#work" className="work-scroll">
                                <div className="ball"></div>
                            </a>
                            <p className='scroll-text'>
                                <Link to="work" smooth={true} duration={500}> {/* Use Link from react-scroll */}
                                    Scroll down to see more
                                </Link>
                            </p>
                        </div>
                    </div>

                    <section id="work">
                        <Featured restBase={restBase}
                         />
                    </section>

                    {/* social media icons */}
                    <div className="social-media-icons">
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
                    </div>
                </article>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default Home;
