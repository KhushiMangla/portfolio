import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import Loading from './Loading';
import Splash from './Splash'; // Import the Splash component
import Collapsible from 'react-collapsible';

const SingleWork = ({ restBase, featuredImage }) => {
  const { slug } = useParams();
  const restPath = restBase + `work?slug=${slug}&acf_format=standard&embed`;
  const [restData, setData] = useState({});
  const [isLoaded, setLoadStatus] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isCollapsed, setCollapsed] = useState(true);
  const toggleCollapsible = () => {
    setCollapsed(!isCollapsed);
  };



  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data[0]);
        setLoadStatus(true);
        setTimeout(() => {
          // setLoadStatus(true);
          setShowSplash(false);
        }, 1000); // Hide the splash screen when data is loaded
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);

  return (
    <div>
      {showSplash ? (
        <Splash />
      ) : isLoaded ? (
        <>
          <div className="single-work-container">
            <div className='image-title-overview-container'>
              <img src={restData.acf.project_img} alt="project image" />
              <div className="title-overview-container">
                <h1 className="single-work-title">{restData.title.rendered}</h1>
                <div className="single-work-overview">{restData.acf.project_overview}</div>
              </div>
              {/* Site-button */}
              <div className="site-btn-container">
                {restData.acf.live_site.map((liveSite, index) => (
                  <a
                    key={index}
                    href={liveSite.live_site}
                    target="_blank"
                    rel="noopener noreferrer">
                    {/* noopener noreferrer makes it open on new tab */}
                    <button className="site-btn"><p>{liveSite.live_site_name}</p></button>
                  </a>
                ))}

                {restData.acf.github_site.map((githubSite, index) => (
                  <a
                    key={index}
                    href={githubSite.github_site}
                    target="_blank"
                    rel="noopener noreferrer">
                    {/* noopener noreferrer makes it open on new tab */}
                    <button className="site-btn"><p>{githubSite.github_site_name}</p></button>
                  </a>
                ))}
              </div>
              {/* Tools Used */}
              <div className="tools-container">
                <div className='tools-used-heading'>{restData.acf.tools_used_heading}</div>
                {restData.acf.tools_used.map((tool, index) => (
                  <img
                    key={index}
                    src={tool.tools}
                    alt={`image of tool ${index + 1}`} />
                  // for SEO purpose: this code will set the alt attribute for each image as "image of tool 1", "image of tool 2"


                ))}
              </div>
            </div>
            {/* <div
              className="entry-content"
              dangerouslySetInnerHTML={{ __html: restData.content.rendered }}>
            </div> */}
            <div className="drop-show">
              <Collapsible trigger={<div className="accordian" onClick={toggleCollapsible}>{restData.acf.learn_heading}
                <div className="test"> {isCollapsed ? '+' : '-'}</div>
              </div>} open={!isCollapsed}>
                <p style={{ padding: '1.5rem' }}>
                  <div dangerouslySetInnerHTML={{ __html: restData.acf.learn_section }} />
                </p>

              </Collapsible>

              <Collapsible trigger={<div className="accordian" onClick={toggleCollapsible}>{restData.acf.highlights_heading}
                <div className="test"> {isCollapsed ? '+' : '-'}</div>
              </div>}
                open={!isCollapsed}>
                <p style={{ padding: '1.5rem' }}>

                  <div dangerouslySetInnerHTML={{ __html: restData.acf.highlights_section }} />
                </p>
              </Collapsible>

              <Collapsible trigger={
                <div className="accordian" onClick={toggleCollapsible}>
                  {restData.acf.process_heading}
                  <div className="test"> {isCollapsed ? '+' : '-'}</div>
                </div>
              } open={!isCollapsed}>
                <p style={{ padding: '1.5rem' }}>
                  <div dangerouslySetInnerHTML={{ __html: restData.acf.process_section }} />
                </p>
              </Collapsible>
            </div>
          </div>
          {/* social media icons
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
          </section> */}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SingleWork;
