import { useEffect, useMemo, useState } from "react";

export default function useOnScreen ( ref ) {

  const [ isIntersecting, setIntersecting ] = useState( false );

  const observer = useMemo( () => new IntersectionObserver(
    ( [ entry ] ) => setIntersecting( entry.isIntersecting )
  ), [ ref ] );

  if ( ref?.current ) {
    observer.observe( ref.current );
  }

  useEffect( () => {
    if ( ref?.current ) observer.observe( ref.current );
    return () => observer.disconnect();
  }, [] );

  return isIntersecting;
}