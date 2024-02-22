import React, { useEffect, useRef, useState } from 'react';
import Styles from "./Episode.module.css";
import { Link, useOutletContext, useParams } from 'react-router-dom';

const Episode = () => {

  const [ servers, setServers ] = useState( null );
  const [ siblingEpisodes, setSiblingEpisodes ] = useState( null );
  const [ firstEpisode, latestEpisode, allEpisodes ] = useOutletContext();
  const [ currentEpisode, setCurrentEpisode ] = useState( undefined );
  const { epID, animeID } = useParams();
  const ref = useRef();

  useEffect( () => {

    const fetchServers = async () => {
      try {

        const response = await fetch( "https://anime-api-liart.vercel.app/episode-servers", {
          method: "POST",
          body: JSON.stringify( {
            epId: epID
          } ),
          headers: {
            "Content-Type": "application/json"
          }
        } );

        if ( response.ok ) {
          const body = await response.json();
          setServers( body );
        }


      } catch ( e ) {
        console.log( e );
      }
    };

    fetchServers();

  }, [ epID, animeID ] );

  useEffect( () => {
    if ( servers ) {

      let iframe;

      // const handleEvent = () => {
      //   console.log( ref.current );
      //   ref.current.scrollIntoView( {
      //     behavior: "smooth"
      //   } );
      //   iframe.scrollIntoView( {
      //     behavior: "smooth"
      //   } );
      // };

      const timeOut = setTimeout( () => {
        iframe = document.querySelector( "iframe." + Styles[ "episode-iframe" ] );

        if ( iframe || ref.current ) {
          ref?.current?.scrollIntoView( { behavior: "smooth" } );
          iframe?.scrollIntoView( { behavior: "smooth" } );
        }

        clearTimeout( timeOut );
      }, 500 );
    }

  }, [ ref, ref.current, servers ] );

  useEffect( () => {
    const episodeNumber = allEpisodes[ allEpisodes.findIndex( ep => ep.id == epID ) ]?.number;
    setCurrentEpisode( episodeNumber );

    let prev = false;
    let next = false;

    if ( firstEpisode !== episodeNumber ) {
      prev = true;
    }
    if ( latestEpisode !== episodeNumber ) {
      next = true;
    }

    setSiblingEpisodes( [ prev ? allEpisodes[ allEpisodes.findIndex( ep => ep.number == episodeNumber ) - 1 ] : null, next ? allEpisodes[ allEpisodes.findIndex( ep => ep.number == episodeNumber ) + 1 ] : null ] );

  }, [ firstEpisode, latestEpisode, epID, animeID ] );


  return (
    <div className={ Styles[ 'episode-controls' ] }>
      { servers && (
        <>
          <iframe ref={ ref } className={ Styles[ "episode-frame" ] } src={ servers[ 0 ].url } allowFullScreen frameBorder="0"></iframe>
          <div className={ Styles[ "buttons" ] }>
            { siblingEpisodes && siblingEpisodes?.[ 0 ] && (
              <Link to={ `/${ animeID }/${ siblingEpisodes?.[ 0 ].id }` } className={ Styles[ 'prev' ] } type="button">Previous Episode { siblingEpisodes[ 0 ].number }</Link>
            ) }
            { siblingEpisodes && siblingEpisodes?.[ 1 ] && (
              <Link to={ `/${ animeID }/${ siblingEpisodes?.[ 1 ].id }` } className={ Styles[ 'next' ] } type="button">Next Episode { siblingEpisodes[ 1 ].number }</Link>
            ) }
          </div>
        </>
      ) }

    </div>
  );
};

export default Episode;