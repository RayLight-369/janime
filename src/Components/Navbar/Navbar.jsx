import React, { useEffect } from "react";
import { API_URLS, NavbarLinks } from "../../Constants/index";
import { NavLink, Outlet } from "react-router-dom";
import Styles from "./Navbar.module.css";

const Navbar = () => {

  useEffect( () => {

    const Controller = new AbortController();

    function getCookie ( cookieName ) {
      const cookie = document.cookie
        .split( ';' )
        .map( cookie => cookie.trim().split( '=' ) )
        .find( ( [ name ] ) => name === cookieName );

      return cookie ? cookie[ 1 ] : null;
    }

    async function PostView () {
      try {
        const response = await fetch( API_URLS.VIEWERS_COUNT, {
          method: "POST",
          body: JSON.stringify( {
            visited: !!getCookie( "deviceVisited" )
          } ),
          headers: {
            "Content-Type": "application/json"
          },
          signal: Controller.signal
        } );

        if ( response.ok ) {
          const body = await response.json();
          console.log( body );
          document.cookie = "deviceVisited=true";
          document.cookie = "visitedCount=" + body.count;
        }
      } catch ( e ) {
        if ( e.name != "AbortError" ) console.log( e );
      }
    }

    PostView();
    console.log( "rendered" );

    return () => {
      Controller.abort();
    };
  }, [] );

  return (
    <>
      <header className={ Styles.header }>
        <div className={ Styles.logo }>
          <img src={ require( "../../Assets/Imgs/logo.png" ) } alt="logo" />
        </div>
        <nav className={ Styles.nav }>
          { NavbarLinks.map( ( link, index ) => (
            <NavLink
              className={ ( { isActive } ) =>
                isActive ? `${ Styles.link } ${ Styles.active }` : Styles.link
              }
              to={ link.link }
              key={ index }
            >
              { link.name }
            </NavLink>
          ) ) }
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
