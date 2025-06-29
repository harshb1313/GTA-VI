import React, { useState } from 'react';
import './index.css';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css';

function App() {
  const [showContent, setShowContent] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to('.vi-mask-group', {
      rotation: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    })
      .to('.vi-mask-group', {
        scale: 10,
        duration: 2,
        ease: "Expo.easeInOut",
        transformOrigin: "50% 50%",
        delay: -1.8,
        opacity: 0,
        onUpdate: function () {
          if (this.progress() >= 0.9) {
            document.querySelector('.svg').remove();
            setShowContent(true);
            this.kill();
          }
        }
      })


  })
  useGSAP(() => {
    const main = document.querySelector('.main');
    main?.addEventListener('mousemove', function(e) {
      const xMove = (e.clientX / window.innerWidth - 0.5 ) * 40;
      gsap.to(".imagesdiv .textblock",{
        x: `${xMove*0.6}%`
      }),
      gsap.to(".imagesdiv .sky",{
        x: `${xMove*0.2}%`
      }),
      gsap.to(".imagesdiv .bgimg",{ 
        x: `${xMove*0.2}%`
      })
    })
  },[showContent])

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (<div className='main w-full h-full bg-black'>


        <div className='landig w-full h-screen bg-black'>
          <div className='navbar w-full absolute top-0 left-0 z-[10]  py-10 px-10'>
            <div className='logo flex gap-5'>
              <div className='lines flex flex-col gap-2'>
                <div className='line w-10 h-1 bg-white'></div>
                <div className='line w-8 h-1 bg-white'></div>
                <div className='line w-6 h-1 bg-white'></div>
              </div>
              <h1 className='text-white text-2xl -mt-[7.5px] leading-none'>Rockstar</h1>
            </div>
          </div>
          <div className='imagesdiv  w-full h-screen bg-black relative overflow-hidden'>
            <img className='sky object-cover object-center scale-[1.4]' src="./sky.png" alt="" />
            <img className='bgimg absolute top-0 left-0 object-cover object-center scale-[1.2]' src="./bg.png" alt="" />
            <div className='textblock text-white  text-7xl absolute top-5 left-1/2 -translate-x-1/2 flex flex-col gap-1'>
              <h1 className='-ml-40 leading-none'>grand</h1>
              <h1 className='-ml-20 leading-none'>theft</h1>
              <h1 className='-ml-40 leading-none'>auto</h1>
            </div>
            <img className='character absolute -bottom-[85%] left-1/2 -translate-x-1/2 object-cover object-center  scale-[0.7]' src="./girlbg.png" alt="" />
          </div>
          <div className='text absolute text-white bottom-0 left-0 w-full px-10 py-15 bg-gradient-to-t from-black to-transparent'>
            <div className='flex gap-4 items-center'>
              <i className="text-3xl ri-arrow-down-line"></i>
              <h3 className='text-xl font-mono'>Scroll Down</h3>
            </div>
            <img className='h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute' src="./ps5.png" alt="" />
          </div>

        </div>
        <div className='w-full h-screen bg-black'></div>
      </div>)}
    </>
  )
}

export default App
