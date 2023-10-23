import { useState, useEffect } from 'react'
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom'

import Loading from './Loading'


const Work = ({ restBase, featuredImage }) => {
    const restPath = restBase + 'work?_embed'
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
                <div >

                    {restData.map(post =>
                        <article key={post.id} id={`post-${post.id}`}>
                            {post.featured_media !== 0 && post._embedded &&
                                <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}></figure>
                            }
                            <div>
                                <Link to={`/work/${post.slug}`}><h2>{post.title.rendered}</h2></Link>
                                <div className="entry-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>

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
