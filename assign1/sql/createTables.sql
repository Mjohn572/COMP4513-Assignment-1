CREATE TABLE IF NOT EXISTS songs (
    song_id INT PRIMARY KEY, 
    tite INT, 
    artist_id INT REFERENCES artists(artist_id), 
    genre_ID INT REFERENCES genres(genre_ID), 
    year INT, 
    bpm INT, 
    energy INT, 
    danceability INT, 
    loudness INT, 
    liveness INT, 
    valence INT, 
    duration INT, 
    acousticness INT, 
    speechiness INT, 
    popularity INT
);

CREATE TABLE IF NOT EXISTS artists (
    artist_id INT PRIMARY KEY, 
    artist_name TEXT, 
    artist_type INT REFERENCES types(type_id), 
    artist_image_url TEXT, 
    spotify_url TEXT, 
    spotify_desc TEXT
);

CREATE TABLE IF NOT EXISTS genres (
    genre_id INT PRIMARY KEY, 
    genre_name TEXT
);

CREATE TABLE IF NOT EXISTS types (
    type_id INT PRIMARY KEY, 
    type_name TEXT
);

CREATE TABLE IF NOT EXISTS playlists (
    id INT PRIMARY KEY, 
    playlist_id INT, 
    song_id INT REFERENCES songs(song_id)
);