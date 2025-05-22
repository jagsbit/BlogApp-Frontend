import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import futuristicImage from "../assets/futuristic-glasses.jpg"; 
import { Link } from "react-router-dom";

import { isLoggedin } from "../auth";

const Home = () => {
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headingRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        subHeadingRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.5 },
        "-=0.5"
      )
      .fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        "-=0.4"
      );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-6 py-16">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10">
        {/* Left: Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1
            ref={headingRef}
            className="text-4xl md:text-6xl font-bold text-blue-800 mb-4"
          >
            Welcome to the Future
          </h1>
          <p
            ref={subHeadingRef}
            className="text-lg md:text-xl text-blue-700 mb-6"
          >
            Dive into a futuristic blog experience. Explore tech, innovation,
            and ideas that shape tomorrow. From AI breakthroughs and space
            exploration to cutting-edge gadgets and digital trends — our
            platform is your gateway to the world ahead. Stay curious, stay
            informed, and journey with us into the future of possibility.
          </p>

          <Link to="/private/user-dash">
            <button
              ref={buttonRef}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Start Exploring
            </button>
          </Link>
        </div>

        {/* Right: Image Section */}
        <div className="flex-1 flex justify-center items-center">
          <img
            ref={imageRef}
            src={futuristicImage}
            alt="Futuristic Glasses"
            className="rounded-2xl shadow-2xl object-cover max-h-[400px] w-full md:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
