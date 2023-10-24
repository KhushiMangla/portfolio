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
                        {restData.featured_media !== 0 && restData._embedded &&
                            <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}></figure>
                        }
                    </article>
                    <nav className="posts-navigation">
                        {restData.previous_post && restData.previous_post['id'] &&
                            <Link to={`/work/${restData.previous_post['slug']}`} className="prev-post">Previous: {restData.previous_post['title']}</Link>
                        }
                        {restData.next_post && restData.next_post['id'] &&
                            <Link to={`/work/${restData.next_post['slug']}`} className="next-post">Next: {restData.next_post['title']}</Link>
                        }
                    </nav>
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
