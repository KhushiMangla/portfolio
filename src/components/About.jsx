import { useState, useEffect } from 'react'
import Loading from './Loading'

const About= ({ restBase }) => {
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
                            <div dangerouslySetInnerHTML={{ __html: restData.content.rendered }} />
                        </section>
                    </div>
                 
                    
                </article>
                
                :
                <Loading />
            }
        </>
    );
}

export default About
