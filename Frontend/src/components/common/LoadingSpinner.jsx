// import React, { useEffect, useState } from "react";
// import "./LoadingSpinner.css";

// const LoadingSpinner = () => {
//     const messages = [
//         "Curating exceptional creations...",
//         "Discovering rare brilliance...",
//         "Preparing your experience...",
//         "Revealing the details...",
//     ];

//     const [messageIndex, setMessageIndex] = useState(0);
//     const [messageVisible, setMessageVisible] = useState(true);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setMessageVisible(false);

//             const timeout = setTimeout(() => {
//                 setMessageIndex((previous) =>
//                     (previous + 1) % messages.length
//                 );
//                 setMessageVisible(true);
//             }, 550);

//             // Keep the timeout associated with this interval cycle.
//             timeouts.push(timeout);
//         }, 7000);

//         const timeouts = [];

//         return () => {
//             clearInterval(interval);
//             timeouts.forEach(clearTimeout);
//         };
//     }, []);

//     return (
//         <div className="diva-loading-screen" role="status" aria-live="polite">
//             <main className="diva-loading-content">

//                 {/* Emblem and animated orbit */}
//                 <div className="diva-emblem-wrapper">

//                     {/* Ambient glow */}
//                     <div className="diva-ambient-glow" />

//                     {/* Stationary circular tracks */}
//                     <svg
//                         className="diva-orbit-tracks"
//                         viewBox="0 0 220 220"
//                         fill="none"
//                         aria-hidden="true"
//                     >
//                         <circle
//                             cx="110"
//                             cy="110"
//                             r="86"
//                             stroke="#E9E2D9"
//                             strokeWidth="0.75"
//                             strokeDasharray="2 4"
//                             opacity="0.7"
//                         />

//                         <circle
//                             cx="110"
//                             cy="110"
//                             r="80"
//                             stroke="#A9765D"
//                             strokeOpacity="0.22"
//                             strokeWidth="1.2"
//                         />

//                         <circle
//                             cx="110"
//                             cy="110"
//                             r="75"
//                             stroke="#EBE4DC"
//                             strokeWidth="0.6"
//                             opacity="0.6"
//                         />
//                     </svg>

//                     {/* 360 degree traveling light */}
//                     <svg
//                         className="diva-orbit-animation"
//                         viewBox="0 0 220 220"
//                         fill="none"
//                         aria-hidden="true"
//                     >
//                         <defs>
//                             <linearGradient
//                                 id="divaOrbitGradient"
//                                 x1="0%"
//                                 x2="100%"
//                                 y1="100%"
//                                 y2="0%"
//                             >
//                                 <stop offset="0%" stopColor="#FAF8F3" stopOpacity="0" />
//                                 <stop offset="35%" stopColor="#D4A373" stopOpacity="0.15" />
//                                 <stop offset="70%" stopColor="#C5A087" stopOpacity="0.55" />
//                                 <stop offset="92%" stopColor="#EEDAC5" stopOpacity="0.9" />
//                                 <stop offset="100%" stopColor="#FFFDF7" stopOpacity="1" />
//                             </linearGradient>

//                             <filter
//                                 id="divaTracerGlow"
//                                 x="-80%"
//                                 y="-80%"
//                                 width="260%"
//                                 height="260%"
//                             >
//                                 <feGaussianBlur
//                                     stdDeviation="3.2"
//                                     result="blur"
//                                 />
//                                 <feMerge>
//                                     <feMergeNode in="blur" />
//                                     <feMergeNode in="SourceGraphic" />
//                                 </feMerge>
//                             </filter>
//                         </defs>

//                         <g className="diva-tracer-arm">
//                             <path
//                                 d="M 33.6 85.8 A 80 80 0 0 1 110 30"
//                                 stroke="url(#divaOrbitGradient)"
//                                 strokeWidth="2.5"
//                                 strokeLinecap="round"
//                             />

//                             <path
//                                 d="M 45 95 A 86 86 0 0 1 110 24"
//                                 stroke="rgba(214,180,154,0.35)"
//                                 strokeWidth="0.8"
//                                 strokeLinecap="round"
//                             />

//                             <g transform="translate(110, 30)">
//                                 <circle
//                                     r="8"
//                                     fill="rgba(212,163,115,0.38)"
//                                     filter="url(#divaTracerGlow)"
//                                 />
//                                 <circle r="4.2" fill="#EEDAC5" />
//                                 <circle r="2.4" fill="#FFFDF8" />
//                                 <circle r="1.2" fill="#FFFFFF" />
//                             </g>
//                         </g>
//                     </svg>

//                     {/* Logo medallion */}
//                     <div className="diva-logo-medallion">
//                         <img
//                             src="/DIVA_LightCut-removebg-preview.png"
//                             alt="DIVA Haute Joaillerie Emblem"
//                             draggable="false"
//                         />

//                         {/* Logo shimmer */}
//                         <div className="diva-logo-sheen" />
//                     </div>

//                     {/* Diamond sparkle */}
//                     <div className="diva-apex-sparkle" aria-hidden="true">
//                         <svg viewBox="0 0 56 56" fill="none">
//                             <path
//                                 d="M28 2 C28 18 19 28 2 28 C19 28 28 38 28 54 C28 38 37 28 54 28 C37 28 28 18 28 2Z"
//                                 fill="#FFFDF5"
//                             />
//                             <path
//                                 d="M28 11 C28 21 21 28 11 28 C21 28 28 35 28 45 C28 35 35 28 45 28 C35 28 28 21 28 11Z"
//                                 fill="#EAD5C1"
//                                 opacity="0.85"
//                             />
//                             <circle cx="28" cy="28" r="2.8" fill="#FFFFFF" />
//                         </svg>
//                     </div>
//                 </div>

//                 {/* Brand identity */}
//                 <div className="diva-loading-brand">

//                     <h1>DIVA</h1>

//                     <p className="diva-brand-subtitle">
//                         Maison de Haute Joaillerie · Paris
//                     </p>

//                     {/* Decorative divider */}
//                     <div className="diva-loading-divider">
//                         <span />
//                         <svg viewBox="0 0 10 10" aria-hidden="true">
//                             <polygon points="5,0.8 9.2,5 5,9.2 0.8,5" />
//                         </svg>
//                         <span />
//                     </div>

//                     {/* Rotating loading messages */}
//                     <div className="diva-loading-status">
//                         <span
//                             className={messageVisible ? "visible" : ""}
//                         >
//                             {messages[messageIndex]}
//                         </span>
//                     </div>

//                 </div>
//             </main>
//         </div>
//     );
// };

// export default LoadingSpinner;





import React, { useEffect, useState } from "react";
import "./LoadingSpinner.css";

const MESSAGES = [
    "Curating exceptional creations...",
    "Discovering rare brilliance...",
    "Preparing your experience...",
    "Revealing the details...",
];

const LoadingSpinner = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    const [messageVisible, setMessageVisible] = useState(true);

    useEffect(() => {
        let timeout;

        const interval = setInterval(() => {
            setMessageVisible(false);

            timeout = setTimeout(() => {
                setMessageIndex((previous) =>
                    (previous + 1) % MESSAGES.length
                );
                setMessageVisible(true);
            }, 550);
        }, 7000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div
            className="diva-loading-screen"
            role="status"
            aria-live="polite"
        >
            <main className="diva-loading-content">

                {/* Emblem and animated orbit */}
                <div className="diva-emblem-wrapper">

                    {/* Ambient glow */}
                    <div className="diva-ambient-glow" />

                    {/* Stationary circular tracks */}
                    <svg
                        className="diva-orbit-tracks"
                        viewBox="0 0 220 220"
                        fill="none"
                        aria-hidden="true"
                    >
                        <circle
                            cx="110"
                            cy="110"
                            r="86"
                            stroke="#E9E2D9"
                            strokeWidth="0.75"
                            strokeDasharray="2 4"
                            opacity="0.7"
                        />

                        <circle
                            cx="110"
                            cy="110"
                            r="80"
                            stroke="#A9765D"
                            strokeOpacity="0.22"
                            strokeWidth="1.2"
                        />

                        <circle
                            cx="110"
                            cy="110"
                            r="75"
                            stroke="#EBE4DC"
                            strokeWidth="0.6"
                            opacity="0.6"
                        />
                    </svg>

                    {/* 360-degree traveling light */}
                    <svg
                        className="diva-orbit-animation"
                        viewBox="0 0 220 220"
                        fill="none"
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient
                                id="divaOrbitGradient"
                                x1="0%"
                                x2="100%"
                                y1="100%"
                                y2="0%"
                            >
                                <stop offset="0%" stopColor="#FAF8F3" stopOpacity="0" />
                                <stop offset="35%" stopColor="#D4A373" stopOpacity="0.15" />
                                <stop offset="70%" stopColor="#C5A087" stopOpacity="0.55" />
                                <stop offset="92%" stopColor="#EEDAC5" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#FFFDF7" stopOpacity="1" />
                            </linearGradient>

                            <filter
                                id="divaTracerGlow"
                                x="-80%"
                                y="-80%"
                                width="260%"
                                height="260%"
                            >
                                <feGaussianBlur
                                    stdDeviation="3.2"
                                    result="blur"
                                />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        <g className="diva-tracer-arm">
                            <path
                                d="M 33.6 85.8 A 80 80 0 0 1 110 30"
                                stroke="url(#divaOrbitGradient)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />

                            <path
                                d="M 45 95 A 86 86 0 0 1 110 24"
                                stroke="rgba(214,180,154,0.35)"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                            />

                            <g transform="translate(110, 30)">
                                <circle
                                    r="8"
                                    fill="rgba(212,163,115,0.38)"
                                    filter="url(#divaTracerGlow)"
                                />
                                <circle r="4.2" fill="#EEDAC5" />
                                <circle r="2.4" fill="#FFFDF8" />
                                <circle r="1.2" fill="#FFFFFF" />
                            </g>
                        </g>
                    </svg>

                    {/* Logo medallion */}
                    <div className="diva-logo-medallion">
                        <img
                            src="/DIVA_LightCut-removebg-preview.png"
                            alt="DIVA Haute Joaillerie Emblem"
                            draggable="false"
                        />

                        {/* Logo shimmer */}
                        <div className="diva-logo-sheen" />
                    </div>

                    {/* FINAL DIAMOND BRILLIANCE EFFECT */}
                    <div className="jewel-flare" aria-hidden="true">
                        <svg
                            viewBox="0 0 48 48"
                            width="48"
                            height="48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Primary vertical and horizontal rays */}
                            <path
                                d="M24 2 C24 16 16 24 2 24 C16 24 24 32 24 46 C24 32 32 24 46 24 C32 24 24 16 24 2 Z"
                                fill="#FFFBF2"
                            />

                            {/* Secondary diagonal rays */}
                            <path
                                d="M24 10 C24 18 18 24 10 24 C18 24 24 30 24 38 C24 30 30 24 38 24 C30 24 24 18 24 10 Z"
                                fill="#E8D2BE"
                                opacity="0.75"
                            />

                            {/* Diamond core */}
                            <circle
                                cx="24"
                                cy="24"
                                r="2.2"
                                fill="#FFFFFF"
                            />
                        </svg>
                    </div>

                </div>

                {/* Brand identity */}
                <div className="diva-loading-brand">

                    <h1>DIVA</h1>

                    <p className="diva-brand-subtitle">
                        Maison de Haute Joaillerie · Paris
                    </p>

                    {/* Decorative divider */}
                    <div className="diva-loading-divider">
                        <span />

                        <svg viewBox="0 0 10 10" aria-hidden="true">
                            <polygon points="5,0.8 9.2,5 5,9.2 0.8,5" />
                        </svg>

                        <span />
                    </div>

                    {/* Rotating loading messages */}
                    <div className="diva-loading-status">
                        <span className={messageVisible ? "visible" : ""}>
                            {MESSAGES[messageIndex]}
                        </span>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default LoadingSpinner;
