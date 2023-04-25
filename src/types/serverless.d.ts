export interface Post {
  title: string;
  description: string;
  slug: string;
  date: string;
  og: string;
  body: null;
}

export interface Spotify {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
}

export interface Music {
  title: string;
  description: string;
  image: string;
  url: string;
  key: string;
}
export interface Playlist {
  schema: {
    name: string;
    color: string;
  }[];
  data: Music[];
}
