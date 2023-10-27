import { useState, useEffect } from 'react'
import Loading from './Loading'

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
        <>
            {isLoaded ?
                <article id={`post-${restData.id}`}>
                    <h1>{restData.title.rendered}</h1>
                    <div className="entry-content">
                        <section>
                            <p>{restData.acf.para1}</p>
                        </section>
                        <section>
                            <p>{restData.acf.para2}</p>
                        </section>
                        <section>
                            <p>{restData.acf.para3}</p>
                        </section>
                    </div>

                    {/* toolkit */}
                    <div className='inline-block'>
                        {restData.acf.all.map((item, index) => (
                            <div key={index}>{item.all}</div>
                        ))}
                        <br></br>

                        {restData.acf.development.map((item, index) => (
                            <div key={index}>{item.development}</div>
                        ))}

                        <br></br>
                        {restData.acf.design.map((item, index) => (
                            <div key={index}>{item.design}</div>
                        ))}
                    </div>


                </article>

                :
                <Loading />
            }
        </>
    );
}

export default About
