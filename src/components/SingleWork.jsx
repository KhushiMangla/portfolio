import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import Loading from './Loading'

const SingleWork = ({ restBase, featuredImage }) => {
    const { slug } = useParams();
    const restPath = restBase + `work?slug=${slug}`
    const [restData, setData] = useState({})
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if (response.ok) {
                const data = await response.json()
                setData(data[0])
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
                <>
                    <article id={`post-${restData.id}`}>
                        <h1>{restData.title.rendered}</h1>
                        <div className="entry-content" dangerouslySetInnerHTML={{ __html: restData.content.rendered }}></div>
                    </article>
                    <section class="social-media-icons">
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
                </>
                :
                <Loading />
                
            }
        </>
    )
}

export default SingleWork
