import React from 'react'
import "./Loader.css"
const Loader = ({ value }) => {
    return (
        <div className="loaders" >
            {/*  Loader 1 */}
            {value === 1 && <div className="loader loader1">
                <span />
            </div>}
            {/*  Loader 2 */}
            {value === 2 && <div className="loader loader2">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
            </div>}
            {/*  Loader 3 */}
            {value === 3 && <div className="loader loader3">
                <div className="spinner">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
                <svg>
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation={8} result="blur" />
                            <feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 50 -8" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>
            </div>}
        </div>
    )
}

export default Loader