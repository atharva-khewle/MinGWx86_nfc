import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './LandingPage.css'; // Import your CSS file here

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  useEffect(() => {
    const sections = gsap.utils.toArray('.panel');

    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none', // <-- IMPORTANT!
      scrollTrigger: {
        trigger: '.container',
        pin: true,
        scrub: 0.1,
        end: '+=3000'
      }
    });

    gsap.set('.box', { y: 0 });
    ScrollTrigger.defaults({ markers: { startColor: 'white', endColor: 'white' } });

    // Apply animation to each panel
    // sections.forEach((section, index) => {
    //   gsap.to(section, {
    //     y: -130,
    //     duration: 2,
    //     ease: 'elastic',
    //     scrollTrigger: {
    //       trigger: section,
    //       containerAnimation: scrollTween,
    //       start: 'left center',
    //       toggleActions: 'play none none reset',
    //       id: `${index + 1}`
    //     }
    //   });
    // });

    // Clean up ScrollTrigger instances on component unmount
    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <div className='h-[100vh] w-[100vw] bg-yellow-300'>
      <div className="description h-full w-full flex items-center justify-center p-[10px]">
        <div className='text-8xl text-white font-black'>
          PROJECT TITLE
        </div>
      </div>

      <div className="container bg-red-300">
        <section className="panel  m-2 blue">
          <img src="https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/DevsMember%2F2024%2Fatharva.png?alt=media&token=ababa798-5f3c-4e4e-bb17-c1a2b108f51b" alt="box-1" className="box-1 box" />
        </section>

        <section className="panel m-2 blue">
          <img src="https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/DevsMember%2F2024%2Fatharva.png?alt=media&token=ababa798-5f3c-4e4e-bb17-c1a2b108f51b" alt="box-1" className="box-1 box" />
        </section>
        
        <section className="panel m-2 blue">
          <img src="https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/DevsMember%2F2024%2Fatharva.png?alt=media&token=ababa798-5f3c-4e4e-bb17-c1a2b108f51b" alt="box-2" className="box-2 box" />
        </section>

        <section className="panel m-2 blue">
          <img src="https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/DevsMember%2F2024%2Fatharva.png?alt=media&token=ababa798-5f3c-4e4e-bb17-c1a2b108f51b" alt="box-3" className="box-3 box" />
        </section>

        <section className="panel m-2 blue">
          <img src="https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/DevsMember%2F2024%2Fatharva.png?alt=media&token=ababa798-5f3c-4e4e-bb17-c1a2b108f51b" alt="box-4" className="box-4 box" />
        </section>
      </div>

      <div className="final h-screen w-screen bg-[#0f2435] flex justify-center items-end ">
        <div className="h-[89%] w-[90%] border-x border-t border-gray-300 flex items-center justify-center   flex-col">
          <div className='w-full h-[13.5%] flex'>
            <div className='h-full w-[70%] border-b border-gray-300 border-r'></div>
            <div className='h-full w-[30%] flex items-center justify-center'>
              <div>
                <span className=' text-2xl small-outlined-text'>AINT&nbsp;</span>
                <span className=' text-2xl font-bold'>NO&nbsp;</span>
                <span className=' text-2xl small-outlined-text'>FOE&nbsp;</span>
                <span className=' text-2xl font-bold'>IN&nbsp;</span>
                <span className=' text-2xl small-outlined-text'>SIGHT&nbsp;</span>

              </div>
              

            </div>
          </div>
          <div className='w-full h-[86.5%] relative  flex flex-col items-center justify-start '>
            <div className="relative flex items-start justify-center mt-[3rem] ">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/nfc3-2024.appspot.com/o/pngwing.com%20(1).png?alt=media&token=36399fce-5267-4c53-9ec5-f57275cb677d" 
                alt="" 
                className="absolute inset-0 h-[48vh] top-[-10%] left-[26%] object-contain z-10"
              />

              <span className="text-white text-[10rem] italic font-bold letter-spacing-tight mr-[5rem] ">PRIZE</span>
              <span className="outlined-text text-[10rem] letter-spacing-tight ml-[5rem] ">POOL</span>
            </div>
            <div className=' h-full w-full flex items-center justify-center'>
              DANCE FOR ME DANCE FOR ME OOOH
            </div>
          </div>
        </div>

      </div>

      <div className="h-screen w-screen flex flex-col bg-[#adfdss] text-white">
  {/* Header Section */}
  <div className="w-full h-[35%] flex items-end justify-center">
    <span className="font-bold text-[11rem]">Title Merch</span>
  </div>

  {/* Image and Catalog Section */}
  <div className="w-full h-[35%] flex px-[1.1rem] justify-around items-center">
    <div className="h-[90%] w-[20%] bg-pink-500 rounded-full overflow-hidden">
      <img src="image1.jpg" alt="Model 1" className="h-full w-full object-cover rounded-full" />
    </div>
    <div className="h-[90%] w-[20%] bg-red-500 rounded-full overflow-hidden">
      <img src="image2.jpg" alt="Model 2" className="h-full w-full object-cover rounded-full" />
    </div>
    <div className="h-[90%] w-[20%] bg-green-500 rounded-full flex flex-col items-center justify-center text-center overflow-hidden">
      <i className="ri-arrow-right-up-line text-white text-2xl"></i>
      <span className="text-white text-lg">See Catalog</span>
    </div>
    <div className="h-[90%] w-[20%] bg-blue-500 rounded-full overflow-hidden">
      <img src="image3.jpg" alt="Model 3" className="h-full w-full object-cover rounded-full" />
    </div>
    <div className="h-[90%] w-[20%] bg-yellow-500 rounded-full overflow-hidden">
      <img src="image4.jpg" alt="Model 4" className="h-full w-full object-cover rounded-full" />
    </div>
  </div>

  {/* Description Section */}
  <div className="w-full h-[30%] flex items-center justify-between px-[1.1rem] text-gray-300 text-sm">
    <div className="w-[30%] p-4">
      <p>Here you will find everything you need. Our collection is constantly expanding to suit your unique style.</p>
    </div>
    <div className="w-[30%] p-4">
      <p>
        The women's clothing in our new collection is both comfortable and stylish, ideal for both casual days and special
        occasions, all at affordable prices.
      </p>
    </div>
    <div className="w-[30%] p-4 flex items-center justify-center">
      <button className="bg-transparent border-2 border-white px-6 py-2 rounded-full text-white hover:bg-white hover:text-black transition-all">
        Explore New Collection
      </button>
    </div>
  </div>
</div>

    </div>
  );
};

export default LandingPage;
