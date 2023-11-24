import React from 'react';
import error from '../images/error.png';
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <div className="error__container">
            <NavLink className="err_link" to="/">
                <img className='error__img' src={error} alt="error" />
                <button className=' btn error__btn'>
                    <p>Go back</p></button>
            </NavLink>
        </div>
    )
}

export default Error;
