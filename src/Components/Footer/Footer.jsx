import React from 'react';
import styles from "./Footer.module.css";

const Footer = ( { handleRequest } ) => {
  return (
    <footer className={ styles[ "footer" ] }>
      <div className={ styles[ "body" ] }>
        <div className={ styles[ "title" ] }>
          <img
            src={ require( "../../Assets/Imgs/logo.png" ) }
            width={ 250 }
            height={ 75 }
            alt='footer'
          />
          <a className={ styles[ "email" ] } href="mailto:help@aions.co">help@aions.co</a>
        </div>
        <div className={ styles[ "update" ] }>
          <p className={ styles[ "title" ] }>
            Stay up to date from Stooge on Internet
          </p>
          <div className={ styles[ "inputs" ] }>
            {/* <input type="text" placeholder='Enter your E-mail' className={ styles[ 'email-input' ] } /> */ }
            <input type="button" className={ styles[ 'request' ] } defaultValue={ "Request" } onClick={ handleRequest } />
          </div>
        </div>
      </div>
      <p className={ styles[ "copyright" ] }>
        © 2023 AIONS
      </p>
    </footer>
  );
};

export default Footer;
