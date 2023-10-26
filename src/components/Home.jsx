import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import Work from './Work'; // Import the Work component
import { NavLink } from 'react-router-dom';
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
        <>
            {isLoaded ? (
                <motion.article id={`post-${restData.id}`} initial="initial" animate="animate">
                    <motion.div className='intro' variants={introVariants}>
                        <motion.div className="intro-left">
                            <motion.section className="name" variants={introVariants}>
                                <h3>{restData.acf.intro}</h3>
                            </motion.section>
                            <motion.section className="tagline" variants={introVariants}>
                                <p>{restData.acf.tagline}</p>
                            </motion.section>
                            <motion.button className="mywork-btn" variants={introVariants}>
                                <NavLink activeClassName="active" to="/work">View my work</NavLink>
                            </motion.button>
                        </motion.div>
                        <motion.section className="profile" variants={introVariants}>
                            <div dangerouslySetInnerHTML={{ __html: restData.content.rendered }} />
                        </motion.section>
                    </motion.div>

                    {/* Rendering work component */}
                    <motion.div className="custom__scroll">
                        <a href="#work" className="work-scroll">
                            <motion.div className="scroll"></motion.div>
                        </a>
                    </motion.div>
                    
                    <section id="work">
                        <Work restBase={restBase} />
                    </section>

                    {/* social media icons */}
                    <motion.section className="social-media-icons" variants={introVariants}>
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
                    </motion.section>
                </motion.article>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Home;
