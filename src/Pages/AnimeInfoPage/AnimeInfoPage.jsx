import { memo, useEffect, useState } from "react";
import Styles from "./AnimeInfoPage.module.css";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import RecentEpisodes from "../../Components/RecentEpisodes/RecentEpisodes";
import { Helmet } from "react-helmet";



const EpisodeBrick = memo( ( { ep, path } ) => {

  return (
    <Link to={ `${ path }` } className={ Styles[ "episode-brick" ] }>
      { ep.number }
    </Link>
  );
} );

const AnimeInfoPage = () => {
  const { animeID } = useParams();
  const [ animeInfo, setAnimeInfo ] = useState( null );
  const [ basicInfo, setBasicInfo ] = useState( null );
  const [ servers, setServers ] = useState( null );
  const Url = useLocation();
  const [ ogValues, setOgValues ] = useState( {
    title: "Anime",
    description: "Anime",
    image: "",
    url: Url
  } );

  useEffect( () => {
    const fetchAnimeInfo = async ( animeID = animeID ) => {
      try {

        const response = await fetch( "https://anime-api-liart.vercel.app/anime-info", {
          method: "POST",
          body: JSON.stringify( {
            id: animeID,
          } ),
          headers: {
            "Content-Type": "application/json" // Set content type header
          },
        } );

        if ( response.ok ) {
          const body = await response.json();

          setOgValues( {
            title: body.title,
            description: body.description,
            image: body.image
          } );

          setAnimeInfo( {
            ...body,
            episodes: body.episodes.map( ep => ( { id: ep.id, number: ep.number } ) )
          } );

          setBasicInfo( {
            Type: body.type,
            Date: body.releaseDate,
            Episodes: body.totalEpisodes,
            Status: body.status,
          } );
        }

      } catch ( e ) {
        console.log( e );
      }
    };


    if ( animeID ) fetchAnimeInfo( animeID );

  }, [ animeID ] );


  return (

    <div id={ Styles[ "anime-info" ] }>
      <Helmet>
        <meta property="og:title" content={ ogValues.title } />

        <meta property="og:description" content={ ogValues.description } />

        <meta property="og:image" content={ ogValues.image } />

        <meta property="og:url" content={ `/${ ogValues.url }` } />
      </Helmet>
      <div className={ Styles[ "content" ] }>
        { animeInfo && (
          <div className={ Styles[ "anime-episode" ] }>
            <div className={ Styles[ "anime-section" ] }>
              <div className={ Styles[ "specific-anime-info" ] }>
                <div className={ Styles[ "anime-content" ] }>
                  <img src={ animeInfo.image } alt="poster" width={ 340 } height={ 490 } />
                  <div className={ Styles[ "info-content" ] }>
                    <p className={ Styles[ "title" ] }>{ animeInfo.title }</p>
                    <div className={ Styles[ "sub-info" ] }>
                      <div className={ Styles[ "genre" ] }>
                        <p className={ Styles[ "heading" ] }>Genre:</p>
                        <div className={ Styles[ "genres" ] }>
                          { animeInfo && animeInfo.genres.map( ( genre, key ) => (
                            <span className={ Styles[ "tag" ] } title="genre" key={ key }>{ genre }</span>
                          ) ) }
                        </div>
                      </div>
                      { basicInfo && Object.entries( basicInfo ).map( ( [ key, val ] ) => (
                        <div className={ Styles[ "info" ] } key={ val }>
                          <p className={ Styles[ "heading" ] }>{ key }: </p>
                          <p className={ Styles[ "tag" ] }>{ val }</p>
                        </div>
                      ) ) }
                      <div className={ Styles[ "other-names" ] }>
                        <p className={ Styles[ "heading" ] }>Other Names:</p>
                        <div className={ Styles[ "names" ] }>
                          { animeInfo && animeInfo.otherName.split( "," ).map( ( name, key ) => (
                            <span className={ Styles[ "tag" ] } title="name" key={ key }>{ name }</span>
                          ) ) }
                        </div>
                      </div>
                      <div className={ Styles[ "desc" ] }>
                        <p className={ Styles[ "heading" ] }>Description: </p>
                        <p className={ Styles[ "tag" ] }>{ animeInfo.description }</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={ Styles[ "episodes-section" ] }>
                  <p className={ Styles[ "title" ] }>Episodes</p>
                  <div className={ Styles[ "episodes" ] }>
                    { animeInfo?.episodes.length && animeInfo.episodes.map( ( ep, key ) => (
                      <EpisodeBrick ep={ ep } path={ `/${ animeID }/${ ep.id }` } setServers={ setServers } key={ key } />
                    ) ) }
                  </div>
                </div>
              </div>
            </div>
            <div className={ Styles[ "episode-streaming" ] }>
              <Outlet context={ [ animeInfo?.episodes?.[ 0 ]?.number, animeInfo?.episodes?.[ animeInfo?.episodes.length - 1 ]?.number, animeInfo?.episodes ] } />
            </div>
          </div>
        ) }
        <RecentEpisodes className={ Styles[ "recent-episodes" ] } loadMore={ false } setLoadMore={ () => { } } />
      </div>
    </div >
  );
};

export default AnimeInfoPage;