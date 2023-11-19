import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import Loading from './Loading';
import Collapsible from 'react-collapsible';

const SingleWork = ({ restBase, featuredImage }) => {
  const { slug } = useParams();
  const restPath = restBase + `work?slug=${slug}&acf_format=standard&embed?1=2`;
  const [restData, setData] = useState({});
  const [isLoaded, setLoadStatus] = useState(false);
  const [openSections, setOpenSections] = useState([]);

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
              <div className="site-btn-container">
                {restData.acf.live_site.map((liveSite, index) => (
                  <a
                    key={index}
                    href={liveSite.live_site}
                    target="_blank"
                    rel="noopener noreferrer">
                    <button className="site-btn"><p>{liveSite.live_site_name}</p></button>
                  </a>
                ))}
                {restData.acf.github_site.map((githubSite, index) => (
                  <a
                    key={index}
                    href={githubSite.github_site}
                    target="_blank"
                    rel="noopener noreferrer">
                    <button className="site-btn"><p>{githubSite.github_site_name}</p></button>
                  </a>
                ))}
              </div>
              <div className="tools-container">
                <div className='tools-used-heading'>{restData.acf.tools_used_heading}</div>
                {restData.acf.tools_used.map((tool, index) => (
                  <img
                    key={index}
                    src={tool.tools}
                    alt={`image of tool ${index + 1}`} />
                ))}
              </div>
            </div>
            <div className="drop-show">
              <Collapsible trigger={<div className="accordian">
                {restData.acf.learn_heading}
                <div className="sign">{openSections.includes(0) ? '-' : '+'}</div>
              </div>}
                onOpen={() => setOpenSections((prevOpenSections) => [...prevOpenSections, 0])}
                onClose={() => setOpenSections((prevOpenSections) => prevOpenSections.filter((openIndex) => openIndex !== 0))}>
                <p style={{ padding: '1.5rem', textAlign: 'left' }}>
                  <div dangerouslySetInnerHTML={{ __html: restData.acf.learn_section }} />
                </p>
              </Collapsible>

              <Collapsible trigger={<div className="accordian">
                {restData.acf.highlights_heading}
                <div className="sign">{openSections.includes(1) ? '-' : '+'}</div>
              </div>}
                onOpen={() => setOpenSections((prevOpenSections) => [...prevOpenSections, 1])}
                onClose={() => setOpenSections((prevOpenSections) => prevOpenSections.filter((openIndex) => openIndex !== 1))}>
                <p style={{ padding: '1.5rem', textAlign: 'left' }}>
                  <div dangerouslySetInnerHTML={{ __html: restData.acf.highlights_section }} />
                </p>
              </Collapsible>

              <Collapsible trigger={<div className="accordian">
                {restData.acf.process_heading}
                <div className="sign">{openSections.includes(2) ? '-' : '+'}</div>
              </div>}
                onOpen={() => setOpenSections((prevOpenSections) => [...prevOpenSections, 2])}
                onClose={() => setOpenSections((prevOpenSections) => prevOpenSections.filter((openIndex) => openIndex !== 2))}>
                <p style={{ padding: '1.5rem',textAlign: 'left' }}>
                  <div dangerouslySetInnerHTML={{ __html: restData.acf.process_section }} />
                </p>
              </Collapsible>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SingleWork;
