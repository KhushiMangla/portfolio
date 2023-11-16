import React from 'react'
// Reference from 

const Splash = () => {
    return (
        <div>
            <div id="cool-loader">
                <div className="react-spinner-loader-svg">
                    <svg id="triangle" width="128" height="128" viewBox="-3 -4 39 39">
                        <polygon fill="transparent" stroke="orange" strokeWidth="1" points="16,0 32,32 0,32" />
                    </svg> LOADING
                </div>
            </div>
        </div>
    )
}

export default Splash