INSERT OR IGNORE INTO songs (
    song_id, 
    title, 
    artist_id, 
    genre_id, 
    year, 
    bpm, 
    energy, 
    danceability, 
    loudness, 
    liveness, 
    valence, 
    duration, 
    acousticness, 
    speechiness, 
    popularity
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);