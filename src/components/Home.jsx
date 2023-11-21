import React, { useState, useEffect } from 'react';
import Featured from './Featured';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import Splash from './Splash';

const Home = ({ restBase }) => {
    const restPath = restBase + 'pages/10';
    const [restData, setData] = useState([]);
    const [showSplash, setShowSplash] = useState(true);
    const [isLoaded, setLoadStatus] = useState(false); // Add isLoaded state

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setTimeout(() => {
                    // setLoadStatus(true);
                    setShowSplash(false);
                }, 1000);
            } else {
                // Handle error if needed
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
            },
        },
    };

    return (
        <div className="home-container">
            {showSplash && <Splash />}
            {!showSplash && (
                <article id={`post-${restData.id}`}>
                    <div className="intro-scroll-container">
                        <div className="intro">
                            <motion.div
                                className="intro-left"
                                variants={introVariants}
                                initial="initial"
                                animate="animate"
                            >
                                <motion.section className="name" variants={introVariants}>
                                    <Typewriter
                                        options={{
                                            strings: [restData.acf.intro],
                                            autoStart: true,
                                            loop: true,
                                        }}
                                    />
                                </motion.section>
                                <motion.section className="tagline" variants={introVariants}>
                                    <p>{restData.acf.tagline}</p>
                                </motion.section>
                                <motion.section>
                                    <motion.button className="mywork-btn" variants={introVariants}>
                                        <Link to="work" smooth={true} duration={500}>
                                            View my work
                                        </Link>
                                    </motion.button>
                                </motion.section>
                            </motion.div>
                            <section className="profile">
                                <div dangerouslySetInnerHTML={{ __html: restData.content.rendered }} />
                            </section>
                        </div>

                        {/* Rendering Featured work component */}
                        <div className="custom__scroll">
                            <a href="#work" className="work-scroll">
                                <div className="ball"></div>
                            </a>
                            <p className="scroll-text">
                                <Link to="work" smooth={true} duration={500}>
                                    Scroll down to see more
                                </Link>
                            </p>
                        </div>
                    </div>
                    <section id="work">
                        <div className="featured-work-title"> Featured Work </div>
                        <Featured restBase={restBase} />
                    </section>
                </article>
            )}
        </div>
    );
};

export default Home;
