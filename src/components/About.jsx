import { useState, useEffect } from 'react'
import Loading from './Loading'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const About = ({ restBase }) => {
    const restPath = restBase + 'pages/43'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if (response.ok) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    return (
        <div className="about-container">
            {isLoaded ?
            <div>
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

                :
                <Loading />
            }
        </div>
    );
}

export default About
