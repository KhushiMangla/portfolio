// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const MoreWork = ({ restBase }) => {
//     const location = useLocation();
//     const currentWorkSlug = location.pathname.split('/').pop();

//     const restPath = restBase + 'pages/292?_embed&acf_format=standard';
//     const [restData, setRestData] = useState({ acf: { more_work_project: [] } });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(restPath);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setRestData(data);
//                 } else {
//                     console.error('Error fetching data');
//                 }
//             } catch (error) {
//                 console.error('Fetch error:', error);
//             }
//         };
//         fetchData();
//     }, [restPath]);

//     // Filter out the current work from the list
//     const filteredWorks = restData.acf.more_work_project.filter(
//         (project) => project.more_project_slug !== currentWorkSlug
//     );

//     return (
//         <>
//             <div>More Work</div>

//             <section className='more_project_name_img_container'>
//                 {filteredWorks.map((project, index) => (
//                     <div key={index}>
//                         <div className='more_project_name'>
//                             <p>{project.more_project_name}</p>
//                             <div className='more_project_img_container'>
//                                 <img src={project.more_project_img} alt={`Project ${index}`} />
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </section>
//         </>
//     );
// };

// export default MoreWork;
