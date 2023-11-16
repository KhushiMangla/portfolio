import { useState, useEffect } from 'react'
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from './Footer';


import Loading from './Loading'



const Work = ({ restBase, featuredImage }) => {
    const restPath = restBase + 'work?_embed&acf_format=standard'
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
                <div className="project-container">

                    {restData.map(post =>
                        <article key={post.id} id={`post-${post.id}`}>

                            <div className="project">
                                <Link to={`/work/${post.slug}`}>
                                    <div className="project-work-container">
                                        <div className="project-title">{post.title.rendered}</div>
                                        <img src={post.acf.project_img} alt="project image" />
                                    </div>
                                    <div class="project-text">{post.acf.card_text}</div>
                                    <button className="read-more-btn" aria-label={`Read more about ${post.title.rendered}`}>
                                        <p>{post.acf.read_more}</p>
                                    </button>
                                </Link>

                            </div>

                        </article>
                    )}


                </div>

                :
                <Loading />
            }
        </>
    )
}

export default Work
