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

    gsap.set('.box', { y: 100 });
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
    <div>
      <div className="description">
        <div>
          <h1>Horizontal "<code>containerAnimation</code>"</h1>
          <p>
            Scroll this page vertically and you'll see a horizontal fake-scrolling section where a container is animated on the x-axis using a ScrollTrigger animation. With <code>containerAnimation</code> you can trigger animations when certain elements <i>inside</i> that container enter the viewport horizontally! It's like a ScrollTrigger inside of a ScrollTrigger. 🤯
          </p>
        </div>
        <div className="scroll-down">
          Scroll down
          <div className="arrow"></div>
        </div>
      </div>

      <div className="container">
        <section className="panel blue">
          <img src="https://picsum.photos/200/300" alt="box-1" className="box-1 box" />
        </section>
        
        <section className="panel blue">
          <img src="https://picsum.photos/200/300" alt="box-2" className="box-2 box" />
        </section>

        <section className="panel blue">
          <img src="https://picsum.photos/200/300" alt="box-3" className="box-3 box" />
        </section>

        <section className="panel blue">
          <img src="https://picsum.photos/200/300" alt="box-4" className="box-4 box" />
        </section>
      </div>

      <div className="final">
        <div>
          <h1>Wasn't that fun?</h1>
          <p>Here are a few caveats to keep in mind:</p>
          <ul>
            <li>The fake-scrolling animation (just the part that's moving the container horizontally) must have no easing (<code>ease: "none"</code>).</li>
            <li>Pinning and snapping won't work on ScrollTriggers with a <code>containerAnimation</code>.</li>
            <li>The mapping of scroll position trigger points are based on the trigger element itself not being animated horizontally (inside the container). If you need to animate the trigger, you can either wrap it in a &lt;div&gt; and use that as the trigger instead or just factor the trigger's movement into your end position. For example, if you animate it left 100px, make the <code>end</code> 100px further to the left.</li>
            <li>Requires ScrollTrigger 3.8.0 or later</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
