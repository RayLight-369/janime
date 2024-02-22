import linkedin from "../Assets/Imgs/linkedin.png";
import x from "../Assets/Imgs/x.png";
import fb from "../Assets/Imgs/fb.png";
import ig from "../Assets/Imgs/ig.png";


export const SocialLionks = [
  {
    src: fb,
    link: "https://www.facebook.com/aionstech"
  },
  {
    src: ig,
    link: "https://www.instagram.com/info.aions/"
  },
  {
    src: linkedin,
    link: "https://www.linkedin.com/company/aionstech/"
  },
  {
    src: x,
    link: "https://twitter.com/heathclif01"
  },
];

export const NavbarLinks = [
  {
    name: "Home",
    link: "/"
  }
];

export const TYPES = {
  TOP_AIRING: "TOP_AIRING",
  SEARCH: "SEARCH",
  RECENT_EPISODES: "RECENT_EPISODES",
  TORRENT_SEARCH: "TORRENT_SEARCH"
};

export const API_URLS = {
  ANIME_SEARCH: "https://anime-api-liart.vercel.app/search",
  TOP_AIRING: "https://anime-api-liart.vercel.app/top-airing",
  VIEWERS_COUNT: "https://anime-api-liart.vercel.app/num-of-viewers",
  RECENT_EPISODES: "https://anime-api-liart.vercel.app/recent-episodes",
  TORRENT_SEARCH: "https://anime-api-liart.vercel.app/torrents"
};