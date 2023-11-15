import React from 'react';
import { useState, useEffect } from 'react';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';

const Footer = ({ restBase }) => {
  const restPath = restBase + 'pages/14?_embed'
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
      <footer id="contact">
        <div className="social-media-icons">
          <a href={`mailto:${restData.acf?.email}`}>
            <span className="icon-wrapper">
              <FaEnvelope />
            </span>
          </a>
          <a href={restData.acf?.linkedin}>
            <span className="icon-wrapper">
              <FaLinkedin />
            </span>
          </a>
          <a href={restData.acf?.github}>
            <span className="icon-wrapper">
              <FaGithub />
            </span>
          </a>
        </div>
        <p className="copyright">
          <a href="https://Khushimangla.com/" target="_blank" rel="noopener noreferrer">&copy; 2023 Khushi Mangla</a>.
        </p>
      </footer>
    </>
  )
}

export default Footer;
