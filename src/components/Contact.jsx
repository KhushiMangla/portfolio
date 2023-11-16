import React from 'react';
import { useState, useEffect } from 'react';
import Loading from './Loading';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';

const Contact = ({ restBase }) => {
    const restPath = restBase + 'pages/14';
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
        <div className='contact-wrapper'>
            {isLoaded ? (
                <div>
<<<<<<< HEAD
                    <section>
                        <div className="contact-heading">{restData.acf.contact_heading}</div>
                        <div className="contact-section">{restData.acf.contact_section}</div>
                    </section>
=======
                    {/* <section>
                        <div className="contact-heading">{restData.acf.contact_heading}</div>
                        <div className="contact-section">{restData.acf.contact_section}</div>
                    </section> */}
>>>>>>> staging
                    {/* social media icons  */}
                    <div className="contact-social-media-wrapper">
                        <section className="social-media-icons">
                            {/* <a href={`mailto:${restData.acf.email}`}>
                                <span className="icon-wrapper">
                                    <img src="../src/images/email.png" alt="insta"
                                        style={{ height: '50px', width: "50px" }} />

                                </span>
<<<<<<< HEAD
                            </a>
                            <a href={restData.acf.linkedin}>
=======
                            </a> */}
                            {/* <a href={restData.acf.linkedin}>
>>>>>>> staging
                                <span className="icon-wrapper">
                                    <img src="../src/images/linkedin.png" alt="insta"
                                        style={{ height: '50px', width: "50px" }} />

                                </span>
<<<<<<< HEAD
                            </a>
                            <a href={restData.acf.instagram}>
=======
                            </a> */}
                            {/* <a href={restData.acf.instagram}>
>>>>>>> staging
                                <span className="icon-wrapper">
                                    <img src="../src/images/insta.png" alt="insta"
                                        style={{ height: '50px', width: "50px" }} />

                                </span>
<<<<<<< HEAD
                            </a>
                            <a href={restData.acf.instagram}>
=======
                            </a> */}
                            {/* <a href={restData.acf.instagram}>
>>>>>>> staging
                                <span className="icon-wrapper">
                                    <img src="../src/images/github.png" alt="insta"
                                        style={{ height: '50px', width: "50px" }} />

                                </span>
<<<<<<< HEAD
                            </a>
=======
                            </a> */}
>>>>>>> staging
                        </section>
                    </div>

                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default Contact;
