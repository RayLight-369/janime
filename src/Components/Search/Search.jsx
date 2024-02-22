import { motion } from "framer-motion";
import { memo } from "react";

import Styles from "./Search.module.css";

const Search = ( { input, setInput, handleSearch, className, placeholder = "Search Movies" } ) => {
  return (
    <div className={ !className ? `${ Styles.inputs }` : `${ Styles.inputs } ${ className }` } onKeyDown={ handleSearch }>
      <input
        type="text"
        value={ input }
        onChange={ ( e ) => setInput( e.target.value ) }
        placeholder={ placeholder }
      />
      <motion.button
        whileHover={ { width: "70px" } }
        whileTap={ { scale: 0.8 } }
        type="button"
        onClick={ () => handleSearch( { key: "Enter" } ) }
      />
    </div>
  );
};


export default memo( Search );