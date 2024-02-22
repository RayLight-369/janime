import { useEffect, useState } from 'react';

/**
 * A custom React hook for fetching anime data.
 * @param {string} query - The query string to search for anime.
 * @param {Object} options - Additional options for fetching anime data.
 * @param {boolean} [options.search] - A boolean indicating whether to include search functionality.
 * @param {string|undefined} [options.genre] - The genre of anime to filter by, or undefined for no filtering.
 * @returns {Array|null} The fetched anime data or null if not fetched yet.
 */
const useAnime = ( query, options ) => {
  const [ data, setData ] = useState( null );

  useEffect( () => {

    if ( options.search && query.trim().length ) {
      fetch( "https://anime-api-liart.vercel.app/search", {
        method: "POST",
        body: JSON.stringify( {
          query
        } )
      } ).then( res => res.json() ).then( body => setData( body ) );
    }

  }, [ query ] );

  return [ data ];
};

export default useAnime;