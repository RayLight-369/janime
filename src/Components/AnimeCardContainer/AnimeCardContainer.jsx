import { lazy, memo, useMemo } from "react";
import Styles from "./AnimeCardContainer.module.css";
import AnimeCard from "../AnimeCard/AnimeCard";

// const MovieCard = lazy(() => import("../MovieCard/MovieCard"));

const AnimeCardContainer = ( {
  animes,
  className,
  ref = null
} ) => {
  // const variants = useMemo(
  //   () => ({
  //     initial: {
  //       opacity: 0,
  //       y: -10,
  //     },
  //     animate: {
  //       opacity: 1,
  //       y: 0,
  //     },
  //     hover: {
  //       scale: 1.08,
  //     },
  //   }),
  //   []
  // );

  return (
    <div
      className={ `${ Styles[ "animes-container" ] } ${ className }` }
      ref={ ref }
    // variants={variants}
    // initial="initial"
    // animate="animate"
    // transition={transition}
    >
      { animes?.length &&
        animes.map( ( anime, index ) => (
          <AnimeCard
            anime={ anime }
            key={ anime.id }
          />
        ) ) }
    </div>
  );
};

export default memo( AnimeCardContainer );
