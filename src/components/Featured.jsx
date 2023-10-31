import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loading from './Loading'

const Featured = ({ restBase }) => {
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
                <div className="featured-work-container">
                    <div className="featured-work-title"> Featured Work </div>
                    <div className="grid">
                        {restData.map(post =>
                            <article key={post.id} className="grid-item">
                                <div className="card">
                                    <Link to={`/work/${post.slug}`}>
                                        <div className="featured-work-content">
                                            <div className="card-title">{post.title.rendered}</div>
                                            <div className="img-container"> <img src={post.acf.project_img} alt="project image" /></div>
                                            <div class="card-text">{post.acf.card_text}</div>
                                            {/* <div className="project-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div> */}
                                        </div>
                                        <button class="read-more-btn">Read more</button>

                                    </Link>



                                </div>
                            </article>
                        )}

                    </div>
                </div>

                :
                <Loading />
            }
        </>
    )
}

export default Featured;