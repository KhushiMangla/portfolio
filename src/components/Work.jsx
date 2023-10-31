import { useState, useEffect } from 'react'
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom'

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

                            <div className="projects">
                                <Link to={`/work/${post.slug}`}><h2>{post.title.rendered}</h2></Link>
                                <div className="project-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
                                <div className="img-container">
                                    <img src={post.acf.project_img} alt="project image" />
                                </div>
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
