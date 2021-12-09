import barba from '@barba/core';
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
  const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: true,
    offset: ['3%', 100],
    lerp: 0.09,
    smartphone: {
      smooth: true
    }
  });

  function pageIn() {
    gsap.to('#content', {});
  }

  function pageOut() {
    gsap.to('#content', {});
  }

  function pageDelay(num) {
    return new Promise((resolve) => {
      setTimeout(resolve, num);
});
  }

  barba.init({
    transitions: [{
      name: 'transition',
      async leave(data) {
        pageIn();
        await pageDelay(1500);
      },

      enter(data) {
        pageOut();
        // Set <body> classes for 'next' page
        const nextHtml = data.next.html;
        const response = nextHtml.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', nextHtml);
        const bodyClasses = $(response).filter('notbody').attr('class');
        $('body').attr('class', bodyClasses);
      },

      async once(data) {
        pageIn();
        await pageDelay(1500);
        pageOut();
      }

    }]
  });

  barba.hooks.beforeLeave(() => {
    scroll.scrollTo('top');
  });

  gsap.set('.cursor', {
    force3D: true
  });

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    gsap.to('.cursor', {
      x: x - 16,
      y: y - 16,
      ease: 'power3'
    });
  });

  document.body.addEventListener('mouseleave', () => {
    gsap.to('.cursor', {
      scale: 0,
      duration: 0.1,
      ease: 'none'
    });
  });

  document.body.addEventListener('mouseenter', () => {
    gsap.to('.cursor', {
      scale: 1,
      duration: 0.1,
      ease: 'none'
    });
  });

  const hoverCursor = document.querySelectorAll('a');

  hoverCursor.forEach((cursor) => {
    cursor.addEventListener('mouseenter', () => {
      gsap.to('.cursor', {
        scale: 2
      });
    });

    cursor.addEventListener('mouseleave', () => {
      gsap.to('.cursor', {
        scale: 1
      });
    });
  });
});
