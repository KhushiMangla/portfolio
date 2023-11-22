import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Splash from './Splash';
import Collapsible from 'react-collapsible';
import aos from 'aos';
import 'aos/dist/aos.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';


const SingleWork = ({ restBase }) => {
  const { slug } = useParams();
  const restPath = restBase + `work?slug=${slug}&acf_format=standard&embed?1=2`;
  const [restData, setData] = useState({});
  const [isLoaded, setLoadStatus] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [openSections, setOpenSections] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data[0]);
        setLoadStatus(true);
        setTimeout(() => {
          setShowSplash(false);
        }, 1000);
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);

  useEffect(() => {
    aos.init();
  }, []);

  return (
    <div>
      {showSplash ? (
        <Splash />
      ) : isLoaded ? (
        <>
          <div className="single-work-container"
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1200"
          >
            <div className='image-title-overview-container'>
              <div className="single-work-title">{restData.title.rendered}</div>
              <img className="single-work-img" src={restData.acf.project_img} alt="project image" />
              <div className="title-overview-container">
                <div className="single-work-overview">{restData.acf.project_overview}</div>
              </div>
              <div className="site-btn-container">
                {restData.acf.live_site.map((liveSite, index) => (
                  <a
                    key={index}
                    href={liveSite.live_site}
                    target="_blank"
                    rel="noopener noreferrer">
                    <button className="site-btn btn"><p>{liveSite.live_site_name}</p></button>
                  </a>
                ))}
                {restData.acf.github_site.map((githubSite, index) => (
                  <a
                    key={index}
                    href={githubSite.github_site}
                    target="_blank"
                    rel="noopener noreferrer">
                    <button className="site-btn btn"><p>{githubSite.github_site_name}</p></button>
                  </a>
                ))}
              </div>
              <div className="tools-container"
                data-aos="fade-up">
                <div className='tools-used-heading'>{restData.acf.tools_used_heading}</div>
                {restData.acf.tools_used.map((tool, index) => (
                  <img
                    key={index}
                    src={tool.tools}
                    alt={`image of tool ${index + 1}`} />
                ))}
              </div>
            </div>
            <div className="drop-show" data-aos="fade-up">
              <Collapsible trigger=
                {<div className="accordian">
                  <div className='accordian_heading'>{restData.acf.learn_heading}</div>
                  <div className="sign">{openSections.includes(0) ? '-' : '+'}</div>
                </div>}
                onOpen={() => setOpenSections((prevOpenSections) => [...prevOpenSections, 0])}
                onClose={() => setOpenSections((prevOpenSections) => prevOpenSections.filter((openIndex) => openIndex !== 0))}>
                <p style={{ padding: '1.5rem', textAlign: 'left' }}>
                  <div dangerouslySetInnerHTML={{ __html: restData.acf.learn_section }} />
                </p>
              </Collapsible>

              <Collapsible trigger=
                {<div className="accordian">
                  <div accordian_heading>{restData.acf.highlights_heading}</div>
                  <div className="sign">{openSections.includes(1) ? '-' : '+'}</div>
                </div>}
                onOpen={() => setOpenSections((prevOpenSections) => [...prevOpenSections, 1])}
                onClose={() => setOpenSections((prevOpenSections) => prevOpenSections.filter((openIndex) => openIndex !== 1))}>
                {/* <p style={{ padding: '1.5rem', textAlign: 'left' }}> */}
                {restData.acf.highlights_section}
                {/* <SyntaxHighlighter language="javascript" style={okaidia}>

                  </SyntaxHighlighter> */}

                {/* </p> */}
              </Collapsible>

              <Collapsible trigger=
                {<div className="accordian">
                  <div className='accordian_heading'>{restData.acf.process_heading}</div>
                  <div className="sign">{openSections.includes(2) ? '-' : '+'}</div>
                </div>}
                onOpen={() => setOpenSections((prevOpenSections) => [...prevOpenSections, 2])}
                onClose={() => setOpenSections((prevOpenSections) => prevOpenSections.filter((openIndex) => openIndex !== 2))}>
                <p style={{ padding: '1.5rem', textAlign: 'left' }}>
                  <div dangerouslySetInnerHTML={{ __html: restData.acf.process_section }} />
                </p>
              </Collapsible>
            </div>
            <Link to="/work">
              <button className="view_all_btn btn ">
                <p>View all work</p>
              </button>
            </Link>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SingleWork;
