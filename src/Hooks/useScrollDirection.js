import { useState, useEffect } from 'react';

function useScrollDirection () {
  const [ scrollDirection, setScrollDirection ] = useState( 0 );
  const [ scrollSpeed, setScrollSpeed ] = useState( 0 );
  const [ lastScrollTop, setLastScrollTop ] = useState( 0 );

  useEffect( () => {
    let ticking = false;

    function handleScroll () {
      if ( !ticking ) {
        window.requestAnimationFrame( () => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const direction = scrollTop > lastScrollTop ? -1 : 1;
          const speed = Math.abs( scrollTop - lastScrollTop ) / window.innerHeight;

          setScrollDirection( direction );
          setScrollSpeed( speed );
          setLastScrollTop( scrollTop );
          ticking = false;
        } );

        ticking = true;
        // setScrollDirection( 0 );
        // setScrollSpeed( 0 );

      }
    }

    window.addEventListener( 'scroll', handleScroll );

    return () => {
      window.removeEventListener( 'scroll', handleScroll );
    };
  }, [ lastScrollTop ] );

  return { scrollDirection, scrollSpeed };
}

export default useScrollDirection;