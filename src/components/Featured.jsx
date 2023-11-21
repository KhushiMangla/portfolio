import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import aos from 'aos';
import 'aos/dist/aos.css';


import Loading from './Loading'

const Featured = ({ restBase }) => {
    const restPath = restBase + 'work?work_category=10&_embed&acf_format=standard'
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
    useEffect(() => {
        aos.init();
    })

    return (
        <>
            {isLoaded ?
                <div className="featured-work-container" 
                data-aos="fade-up">

                    <div className="grid">
                        {restData.map(post =>
                            <article key={post.id} className="grid-item">
                                <Link to={`/work/${post.slug}`}>
                                    <div className="card">

                                        <div className="featured-work-content">
                                            <div className="card-title">{post.title.rendered}</div>
                                            <div> <img src={post.acf.project_img} alt="project image" className="img-container" /></div>
                                            <div class="card-text">{post.acf.card_text}</div>
                                            {/* <div className="project-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div> */}
                                        </div>
                                        <button className="read-more-btn" aria-label={`Read more about ${post.title.rendered}`}>
                                            <p>{post.acf.read_more}</p>
                                        </button>
                                    </div>

                                </Link>
                            </article>
                        )}

                    </div>
                </div >

                :
                <Loading />
            }
        </>
    )
}

export default Featured;