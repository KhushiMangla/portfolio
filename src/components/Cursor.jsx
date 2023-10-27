import React, { useEffect } from 'react';
// refrence - https://codepen.io/Klax/pen/WNLxBMq

const Cursor = () => {
  useEffect(() => {
    const cursors = document.querySelectorAll('.cursor');

    cursors.forEach((div, index) => {
      window.addEventListener('mousemove', (event) => {
        div.style.left = `${event.clientX}px`;
        div.style.top = `${event.clientY}px`;
      });
      div.style.transition = `${(index + 1) * 150}ms linear`;
    });
  }, []);

  return (
    <>
      <div className="cursor-one cursor"></div>
      <div className="cursor-two cursor"></div>
      <div className="cursor-three cursor"></div>
    </>
  );
};

export default Cursor;
