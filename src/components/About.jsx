import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Splash from './Splash'; // Import the Splash component
import aos from 'aos';
import 'aos/dist/aos.css';

const About = ({ restBase }) => {
    const restPath = restBase + 'pages/43';
    const [restData, setData] = useState([]);
    const [showSplash, setShowSplash] = useState(true); // Add state for splash screen

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setTimeout(() => {
                    // setLoadStatus(true);
                    setShowSplash(false);
                }, 1000); // Hide the splash screen when data is loaded
            } else {
                // Handle error if needed
            }
        };
        fetchData();
    }, [restPath]);

    useEffect(() => {
        aos.init();
    })

    if (showSplash || !restData.title) {
        // Render the splash screen or nothing until data is loaded
        return <Splash />;
    }

    return (
        <div className="about-container"
            data-aos="fade-in"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1200"
            data-aos-easing="ease-in-out">
            <div className="about-wrapper">
                <div className='about-title'>{restData.title.rendered}</div>
                <div className="about-content">
                    <section>
                        <p>{restData.acf.para1}</p>
                    </section>
                    <br></br>
                    <section>
                        <p>{restData.acf.para2}</p>
                    </section>
                    <br></br>
                    <section>
                        <p>{restData.acf.para3}</p>
                    </section>
                    <br></br>
                </div>

                {/* toolkit */}

                <div className='toolkit_heading'>{restData.acf.toolkit_heading}</div>
                <Tabs>
                    <TabList>
                        <Tab>{restData.acf.all_heading}</Tab>
                        <Tab>{restData.acf.development_heading}</Tab>
                        <Tab>{restData.acf.design_heading}</Tab>
                    </TabList>

                    <TabPanel className='inline-block'>
                        {restData.acf.all.map((item, index) => (
                            <div key={index}>{item.all}</div>
                        ))}
                    </TabPanel>

                    <TabPanel className='inline-block'>
                        {restData.acf.development.map((item, index) => (
                            <div key={index}>{item.development}</div>
                        ))}
                    </TabPanel>
                    <TabPanel className='inline-block'>
                        {restData.acf.design.map((item, index) => (
                            <div key={index}>{item.design}</div>
                        ))}
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}

export default About;
