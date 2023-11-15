import { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Footer from './Footer';

const About = ({ restBase }) => {
    const restPath = restBase + 'pages/43'
    const [restData, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if (response.ok) {
                const data = await response.json()
                setData(data)
            } else {
                // Handle error if needed
            }
        }
        fetchData()
    }, [restPath])

    if (!restData.title) {
        return null; // Render nothing until data is loaded
    }

    return (
        <div className="about-container">
            <div className="about-wrapper">
                <h1>{restData.title.rendered}</h1>
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

                {/* social media icons */}
                {/* <Footer restData={restData} /> */}
            </div>
        </div>
    );
}

export default About;
