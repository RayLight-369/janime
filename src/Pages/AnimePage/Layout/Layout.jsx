import { useDeferredValue, useEffect, useRef, useState } from 'react';
import Styles from "./AnimePage.module.css";
import Search from '../../Components/Search/Search';
import useAnime from '../../Hooks/useAnime';
import AnimeCardContainer from '../../Components/AnimeCardContainer/AnimeCardContainer';
import { TYPES } from '../../Constants';
import useOnScreen from '../../Hooks/useOnScreen';
import { Outlet } from 'react-router-dom';


const AnimePage = () => {

  const [ recentEpisodes, setRecentEpisodes ] = useState( null );

  const fetchRecentEpisodes = async ( { controller } ) => {
    try {
      const response = await fetch( "https://anime-api-liart.vercel.app/recent-episodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Set content type header
        },
        signal: controller?.signal
      } );

      if ( response.ok ) {
        const body = await response.json();
        setRecentEpisodes( body );
      }
    } catch ( e ) {
      if ( e.name != "AbortError" ) console.log( e );
    }
  };

  const fetchTopAiring = async ( { controller, page = 1 } ) => {
    try {
      const response = await fetch( "https://anime-api-liart.vercel.app/top-airing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Set content type header
        },
        signal: controller?.signal
      } );

      if ( response.ok ) {
        const body = await response.json();
        // setCurrentPageType( TYPES.TOP_AIRING );
        setCurrentPage( {
          type: TYPES.TOP_AIRING,
          hasNextPage: !!body.hasNextPage,
          pageNum: 1
        } );

        if ( page == 1 ) setSearchResults( body );
        else setSearchResults( prev => ( {
          currentPage: body.currentPage,
          hasNextPage: body.hasNextPage,
          results: [
            ...prev.results,
            ...body.results
          ]
        } ) );
      }
    } catch ( e ) {
      if ( e.name != "AbortError" ) console.log( e );
    }
  };

  const fetchAnime = async ( { controller, query = input, page = 1 } ) => {
    try {
      const response = await fetch( "https://anime-api-liart.vercel.app/search", {
        method: "POST",
        body: JSON.stringify( {
          query,
          page
        } ),
        headers: {
          "Content-Type": "application/json" // Set content type header
        },
        signal: controller?.signal
      } );

      if ( response.ok ) {
        const body = await response.json();
        // setCurrentPageType( TYPES.SEARCH );
        setCurrentPage( {
          type: TYPES.SEARCH,
          hasNextPage: !!body.hasNextPage,
          pageNum: 1
        } );

        if ( page == 1 ) setSearchResults( body );
        else setSearchResults( prev => ( {
          currentPage: body.currentPage,
          hasNextPage: body.hasNextPage,
          results: [
            ...prev.results,
            ...body.results
          ]
        } ) );
      }
    } catch ( e ) {
      if ( e.name != "AbortError" ) console.log( e );
    }
  };

  const handleSearch = ( e, searchBy ) => {
    if ( e.key == "Enter" && input.trim().length ) {
      fetchAnime( { controller: null } );
    }
  };



  useEffect( () => {
    // const controller = new AbortController();
    fetchRecentEpisodes( { controller: null } );
  }, [] );

  return (
    <>
      <div className={ Styles[ "anime-section" ] }>
        <Outlet />
        <div className={ Styles[ "recent-episodes" ] }>
          <p className={ Styles[ "recent-episodes-heading" ] }>
            Recent Episodes
          </p>
          { recentEpisodes?.results.length && recentEpisodes.results.map( ( ep, id ) => (
            <a href={ ep.url } target='_blank' onClick={ e => e.stopPropagation() } ref={ id == recentEpisodes.results.length - 1 ? ref : null }>
              <div className={ Styles[ "episode-container" ] } key={ id }>
                <img src={ ep.image } alt="" />
                <div className={ Styles[ "content" ] }>
                  <p className={ Styles[ "title" ] }>{ ep.title.length > 40 ? ep.title.slice( 0, 40 ) + " ..." : ep.title }</p>
                  <p className={ Styles[ "number" ] }>Episode { ep.episodeNumber }</p>
                </div>
              </div>
            </a>
          ) )
          }
        </div>
      </div>
    </>
  );
};

export default AnimePage;