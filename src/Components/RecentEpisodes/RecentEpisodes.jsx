import { useState, useEffect, memo } from "react";
import Styles from "./RecentEpisodes.module.css";
import { API_URLS, TYPES } from "../../Constants";
import { Link } from "react-router-dom";

const RecentEpisodes = ( { className, loadMore, setLoadMore } ) => {
  const [ recentEpisodes, setRecentEpisodes ] = useState( null );
  const [ currentPage, setCurrentPage ] = useState( {
    type: TYPES.RECENT_EPISODES,
    hasNextPage: false,
    pageNum: 1
  } );

  const fetchRecentEpisodes = async ( { controller, page = 1 } ) => {
    try {
      const response = await fetch( API_URLS.RECENT_EPISODES, {
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
        setCurrentPage( {
          type: TYPES.RECENT_EPISODES,
          hasNextPage: body.hasNextPage,
          pageNum: body.currentPage
        } );

        if ( page == 1 ) setRecentEpisodes( body );
        else if ( loadMore && setLoadMore ) setRecentEpisodes( prev => ( {
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
      setLoadMore( false );
    }
  };

  useEffect( () => {

    fetchRecentEpisodes( { controller: null } );

  }, [] );

  useEffect( () => {
    if ( loadMore ) {
      fetchRecentEpisodes( { controller: null, page: currentPage.pageNum + 1 } );
    }
  }, [ loadMore ] );

  return (
    <div className={ `${ Styles[ "recent-episodes" ] } ${ className }` }>
      <p className={ Styles[ "recent-episodes-heading" ] }>
        Recent Episodes
      </p>
      { recentEpisodes?.results.length && recentEpisodes.results.map( ( ep, id ) => (
        <Link to={ `/anime/${ ep.id }/${ ep.episodeId }` } onClick={ e => e.stopPropagation() }>{/** target='_blank' */ }
          <div className={ Styles[ "episode-container" ] } key={ id }>
            <img src={ ep.image } alt="" />
            <div className={ Styles[ "content" ] }>
              <p className={ Styles[ "title" ] }>{ ep.title.length > 40 ? ep.title.slice( 0, 40 ) + " ..." : ep.title }</p>
              <p className={ Styles[ "number" ] }>Episode { ep.episodeNumber }</p>
            </div>
          </div>
        </Link>
      ) )
      }
    </div>
  );
};

export default memo( RecentEpisodes );