import { useState, useEffect } from 'react'
import Loading from './Loading'

const Work = ({ restBase, featuredImage }) => {
    const restPath = restBase + 'work?_embed&order=asc&orderby=title'
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
                            {post.title.rendered}
                            
                            <div className="entry-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
                            {/* {post._embedded['wp:term'][0][0].name} */}
                            {post._embedded['wp:term'].map((terms, index) =>
                            terms.length > 0 ?
                                terms[0].taxonomy === 'work-category' ?
                                    <p key={index}>Work Category: {terms[0].name}</p>
                                :
                                    null
                            :
                                null
                        )}
                          
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
