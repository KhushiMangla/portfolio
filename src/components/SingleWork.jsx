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
    <>
      {isLoaded ? (
        <>
          <article id={`post-${restData.id}`}>
            <h1>{restData.title.rendered}</h1>
            <div className="overview">{restData.acf.project_overview}</div>
            <img src={restData.acf.project_img} alt="project image" />
            <div
              className="entry-content"
              dangerouslySetInnerHTML={{ __html: restData.content.rendered }}
            ></div>
          </article>

          <div className="drop-show">
            <Collapsible trigger={<h2>{restData.acf.learn_heading}</h2>}>
              <p>{restData.acf.learn_section}</p>
            </Collapsible>

            <Collapsible trigger={<h2>{restData.acf.highlights_heading}</h2>}>
              <p>{restData.acf.highlights_section}</p>
            </Collapsible>

            <Collapsible trigger={<h2>{restData.acf.process_heading}</h2>}>
              <p>{restData.acf.process_section}</p>
            </Collapsible>
          </div>

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
    </>
  );
};

export default SingleWork;
