import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import Loading from './Loading';
import Collapsible from 'react-collapsible';

const SingleWork = ({ restBase, featuredImage }) => {
  const { slug } = useParams();
  const restPath = restBase + `work?slug=${slug}&acf_format=standard`;
  const [restData, setData] = useState({});
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data[0]);
        setLoadStatus(true);
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);

  return (
    <div>
      {isLoaded ? (
        <>
          <div className="single-work-container">
            <div className='image-title-overview-container'>
              <img src={restData.acf.project_img} alt="project image" />
              <div className="title-overview-container">
                <h1 className="single-work-title">{restData.title.rendered}</h1>
                <div className="single-work-overview">{restData.acf.project_overview}</div>
              </div>
            </div>
            {/* <div
              className="entry-content"
              dangerouslySetInnerHTML={{ __html: restData.content.rendered }}>
            </div> */}
            <div className="drop-show">
              <Collapsible trigger={<div className="accordian">{restData.acf.learn_heading}</div>}>
                <p style={{padding: '1.5rem'}}>{restData.acf.learn_section}</p>
              </Collapsible>

              <Collapsible trigger={<div className="accordian">{restData.acf.highlights_heading}</div>}>
                <p style={{padding: '1rem'}}>{restData.acf.highlights_section}</p>
              </Collapsible>

              <Collapsible trigger={<div className="accordian">{restData.acf.process_heading}</div>}>
                <p style={{padding: '1rem'}}>{restData.acf.process_section}</p>
              </Collapsible>
            </div>
          </div>
          {/* social media icons */}
          <section className="social-media-icons">
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
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SingleWork;
