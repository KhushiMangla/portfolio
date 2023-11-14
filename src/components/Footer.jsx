import React from 'react';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';

const Footer = ({ restData }) => {
  return (
    <>
      <footer>
        <div className="social-media-icons">
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
        </div>
        <p className="copyright">
          <a href="https://Khushimangla.com/" target="_blank" rel="noopener noreferrer">&copy; 2023 Khushi Mangla</a>.
        </p>
      </footer>
    </>
  )
}

export default Footer;
