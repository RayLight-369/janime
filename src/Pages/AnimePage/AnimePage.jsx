import { useDeferredValue, useEffect, useRef, useState } from 'react';
import Styles from "./AnimePage.module.css";
import Search from '../../Components/Search/Search';
import useAnime from '../../Hooks/useAnime';
import AnimeCardContainer from '../../Components/AnimeCardContainer/AnimeCardContainer';
import { API_URLS, TYPES } from '../../Constants';
import useOnScreen from '../../Hooks/useOnScreen';
import RecentEpisodes from '../../Components/RecentEpisodes/RecentEpisodes';

const AnimePage = () => {

  const [ input, setInput ] = useState( "" );
  const [ searchResults, setSearchResults ] = useState( null );
  const [ loadMore, setLoadMore ] = useState( false );
  // const [ paused, setPaused ] = useState( true );
  const [ loadMoreRecent, setLoadMoreRecent ] = useState( false );
  const ref = useRef();
  const isVisible = useOnScreen( ref );
  const [ currentPage, setCurrentPage ] = useState( {
    type: TYPES.TOP_AIRING,
    hasNextPage: false,
    pageNum: 1
  } );

  // useEffect( () => {
  //   const handleScroll = e => {
  //     const scrollY = document.documentElement.scrollTop;
  //   };
  // }, [] );

  const fetchTopAiring = async ( { controller, page = 1 } ) => {
    // setPaused( true );

    try {
      const response = await fetch( API_URLS.TOP_AIRING, {
        method: "POST",
        body: JSON.stringify( {
          page
        } ),
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
          hasNextPage: body.hasNextPage,
          pageNum: page
        } );

        if ( page == 1 ) setSearchResults( body );
        else setSearchResults( prev => ( {
          currentPage: body.currentPage,
          hasNextPage: body.hasNextPage,
          results: [
            ...( prev?.results?.length ? prev.results : [] ),
            ...body.results
          ]
        } ) );
      }
    } catch ( e ) {
      if ( e.name != "AbortError" ) console.log( e );
    } finally {
      // setPaused( false );
      setLoadMore( false );
    }
  };

  const fetchAnime = async ( { controller, query = input, page = 1 } ) => {
    // setPaused( true );

    try {
      const response = await fetch( API_URLS.ANIME_SEARCH, {
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
          pageNum: page
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
    } finally {
      // setPaused( false );
      setLoadMore( false );
    }
  };

  const handleSearch = ( e, searchBy ) => {
    if ( e.key == "Enter" && input.trim().length ) {
      fetchAnime( { controller: null } );
    }
  };

  useEffect( () => {
    if ( loadMore === false ) return;

    if ( currentPage.hasNextPage && currentPage.type === TYPES.TOP_AIRING ) {
      fetchTopAiring( { controller: null, page: currentPage.pageNum + 1 } );
    } else if ( currentPage.hasNextPage && currentPage.type === TYPES.SEARCH ) {
      fetchAnime( { controller: null, page: currentPage.pageNum + 1 } );
    }

    if ( currentPage.pageNum % 3 == 0 ) {
      setLoadMoreRecent( true );
    }
  }, [ loadMore ] );



  useEffect( () => {
    const controller = new AbortController();

    if ( input.trim().length ) {

      fetchAnime( { controller } );

    } else {

      // for ( let i = 1; i <= 3; i++, fetchTopAiring( { controller: null, page: i } ) );
      fetchTopAiring( { controller: null, page: currentPage.pageNum } );

    }

    return () => controller.abort();

  }, [ input ] );

  useEffect( () => {
    console.log( searchResults );
  }, [ searchResults ] );

  useEffect( () => {
    console.log( "ref: ", isVisible );
  }, [ isVisible ] );

  return (
    <>
      <img src={ require( "../../Assets/Imgs/bg-img.jpg" ) } className={ Styles[ 'bg-img' ] } alt="bg" />
      <div className={ Styles[ "bg" ] }>
        <div className={ Styles[ "hero" ] }>
          <p className={ Styles[ "punchline" ] }>Where every frame tells a story - Welcome to our Anime Haven.</p>
          <Search
            handleSearch={ handleSearch }
            input={ input }
            setInput={ setInput }
            className={ Styles[ "inputs" ] }
            placeholder='Search Anime'
          />
        </div>
      </div>
      <div className={ Styles[ "anime-section" ] }>
        <div className={ Styles[ "top-picks" ] }>
          { input.trim().length == 0 ? (
            <p className={ Styles[ "heading" ] }>Top picks for you</p>
          ) : (
            <p className={ Styles[ "heading" ] } >Search Results</p>
          ) }
          { searchResults && searchResults?.results.length && (
            <>
              <AnimeCardContainer animes={ searchResults.results } className={ Styles[ "anime-container" ] } />
              { currentPage.hasNextPage && (
                <button type='button' className={ Styles[ 'load-more-btn' ] } onClick={ () => setLoadMore( true ) } disabled={ loadMore }>Load More</button>
              ) }
            </>
          ) }
        </div>
        <RecentEpisodes loadMore={ loadMoreRecent } setLoadMore={ setLoadMoreRecent } />
      </div>
    </>
  );
};

export default AnimePage;