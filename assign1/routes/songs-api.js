export function songRoutes(app, db) {

    // Grabs all songs
    app.get('/api/songs', (req, res) => {
        const songs = db.prepare(`
            SELECT 
            s.song_id,
            s.title,
            s.year,
            s.bpm,
            s.energy,
            s.danceability,
            s.loudness,
            s.liveness,
            s.valence,
            s.duration,
            s.acousticness,
            s.speechiness,
            s.popularity,
            s.artist_id,
            a.artist_name,
            g.genre_id,
            g.genre_name
            FROM songs AS s
            INNER JOIN artists AS a ON s.artist_id = a.artist_id
            INNER JOIN genres AS g ON s.genre_id = g.genre_id
            ORDER BY s.title ASC
            `).all();
        if(!songs.length) return res.status(404).json({ error: `No songs Found` });

        const result = songs.map(song => ({
            song_id: song.song_id,
            title: song.title,
            year: song.year,
            bpm: song.bpm,
            energy: song.energy,
            danceability: song.danceability,
            loudness: song.loudness,
            liveness: song.liveness,
            valence: song.valence,
            duration: song.duration,
            acousticness: song.acousticness,
            speechiness: song.speechiness,
            popularity: song.popularity,
            artist: {
                artist_id: song.artist_id,
                artist_name: song.artist_name
            },
            genre: {
                genre_id: song.genre_id,
                genre_name: song.genre_name
            }
        }));
        res.json(result);
    })

    // Grabs all songs in order based on 6 types
    app.get('/api/songs/sort/:order', (req, res) => {
        
        const orderMap = {
            id: 's.song_id',
            title: 's.title',
            artist: 's.artist_name',
            genre: 's.genre_name',
            year: 's.year',
            duration: 's.duration'
        };

        const orderBy = orderMap[req.params.order];

        if(!orderBy) return res.status(404).json({ error: `Invalid Order Field` });
        
        const songs = db.prepare(`
            SELECT 
            s.song_id,
            s.title,
            s.year,
            s.bpm,
            s.energy,
            s.danceability,
            s.loudness,
            s.liveness,
            s.valence,
            s.duration,
            s.acousticness,
            s.speechiness,
            s.popularity,
            s.artist_id,
            a.artist_name,
            g.genre_id,
            g.genre_name
            FROM songs AS s
            INNER JOIN artists AS a ON s.artist_id = a.artist_id
            INNER JOIN genres AS g ON s.genre_id = g.genre_id
            ORDER BY ${orderBy} ASC
            `).all();
        if(!songs.length) return res.status(404).json({ error: `No songs Found` });

        const result = songs.map(song => ({
            song_id: song.song_id,
            title: song.title,
            year: song.year,
            bpm: song.bpm,
            energy: song.energy,
            danceability: song.danceability,
            loudness: song.loudness,
            liveness: song.liveness,
            valence: song.valence,
            duration: song.duration,
            acousticness: song.acousticness,
            speechiness: song.speechiness,
            popularity: song.popularity,
            artist: {
                artist_id: song.artist_id,
                artist_name: song.artist_name
            },
            genre: {
                genre_id: song.genre_id,
                genre_name: song.genre_name
            }
        }));
        res.json(result);
    })

    // Grabs a song with the given ID
    app.get('/api/songs/:id', (req, res) => {
        
        const song = db.prepare(`
            SELECT 
            s.song_id,
            s.title,
            s.year,
            s.bpm,
            s.energy,
            s.danceability,
            s.loudness,
            s.liveness,
            s.valence,
            s.duration,
            s.acousticness,
            s.speechiness,
            s.popularity,
            s.artist_id,
            a.artist_name,
            g.genre_id,
            g.genre_name
            FROM songs AS s
            INNER JOIN artists AS a ON s.artist_id = a.artist_id
            INNER JOIN genres AS g ON s.genre_id = g.genre_id
            WHERE s.song_id = ?
            `).get(req.params.id);
        if(!song) return res.status(404).json({ error: `No song found with id: ${req.params.id}` });

        res.json({
            song_id: song.song_id,
            title: song.title,
            year: song.year,
            bpm: song.bpm,
            energy: song.energy,
            danceability: song.danceability,
            loudness: song.loudness,
            liveness: song.liveness,
            valence: song.valence,
            duration: song.duration,
            acousticness: song.acousticness,
            speechiness: song.speechiness,
            popularity: song.popularity,
            artist: {
                artist_id: song.artist_id,
                artist_name: song.artist_name
            },
            genre: {
                genre_id: song.genre_id,
                genre_name: song.genre_name
            }
        });
    })

    // Grabs songs with the beginning starting with a given phrase/letters
    app.get('/api/songs/search/begin/:sub', (req, res) => {
        
        const songs = db.prepare(`
            SELECT 
            s.song_id,
            s.title,
            s.year,
            s.bpm,
            s.energy,
            s.danceability,
            s.loudness,
            s.liveness,
            s.valence,
            s.duration,
            s.acousticness,
            s.speechiness,
            s.popularity,
            s.artist_id,
            a.artist_name,
            g.genre_id,
            g.genre_name
            FROM songs AS s
            INNER JOIN artists AS a ON s.artist_id = a.artist_id
            INNER JOIN genres AS g ON s.genre_id = g.genre_id
            WHERE s.title LIKE ? COLLATE NOCASE
            `).all(`${req.params.sub}%`);
        if(!songs) return res.status(404).json({ error: `No songs beginning with: ${req.params.sub}` });

        const result = songs.map(song => ({
            song_id: song.song_id,
            title: song.title,
            year: song.year,
            bpm: song.bpm,
            energy: song.energy,
            danceability: song.danceability,
            loudness: song.loudness,
            liveness: song.liveness,
            valence: song.valence,
            duration: song.duration,
            acousticness: song.acousticness,
            speechiness: song.speechiness,
            popularity: song.popularity,
            artist: {
                artist_id: song.artist_id,
                artist_name: song.artist_name
            },
            genre: {
                genre_id: song.genre_id,
                genre_name: song.genre_name
            }
        }));
        res.json(result);
    });

    // Grabs songs with any given phrase/letters within it
    app.get('/api/songs/search/any/:sub', (req, res) => {
        
        const songs = db.prepare(`
            SELECT 
            s.song_id,
            s.title,
            s.year,
            s.bpm,
            s.energy,
            s.danceability,
            s.loudness,
            s.liveness,
            s.valence,
            s.duration,
            s.acousticness,
            s.speechiness,
            s.popularity,
            s.artist_id,
            a.artist_name,
            g.genre_id,
            g.genre_name
            FROM songs AS s
            INNER JOIN artists AS a ON s.artist_id = a.artist_id
            INNER JOIN genres AS g ON s.genre_id = g.genre_id
            WHERE s.title LIKE ? COLLATE NOCASE
            `).all(`%${req.params.sub}%`);
        if(!songs) return res.status(404).json({ error: `No songs containing: ${req.params.sub}` });

        const result = songs.map(song => ({
            song_id: song.song_id,
            title: song.title,
            year: song.year,
            bpm: song.bpm,
            energy: song.energy,
            danceability: song.danceability,
            loudness: song.loudness,
            liveness: song.liveness,
            valence: song.valence,
            duration: song.duration,
            acousticness: song.acousticness,
            speechiness: song.speechiness,
            popularity: song.popularity,
            artist: {
                artist_id: song.artist_id,
                artist_name: song.artist_name
            },
            genre: {
                genre_id: song.genre_id,
                genre_name: song.genre_name
            }
        }));
        res.json(result);
    });

    // Grabs songs equal to the given year
    app.get('/api/songs/search/:year', (req, res) => {
        
        const songs = db.prepare(`
            SELECT 
            s.song_id,
            s.title,
            s.year,
            s.bpm,
            s.energy,
            s.danceability,
            s.loudness,
            s.liveness,
            s.valence,
            s.duration,
            s.acousticness,
            s.speechiness,
            s.popularity,
            s.artist_id,
            a.artist_name,
            g.genre_id,
            g.genre_name
            FROM songs AS s
            INNER JOIN artists AS a ON s.artist_id = a.artist_id
            INNER JOIN genres AS g ON s.genre_id = g.genre_id
            WHERE s.year = ?
            `).all(req.params.year);
        if(!songs) return res.status(404).json({ error: `No song found with year: ${req.params.year}` });

        const result = songs.map(song => ({
            song_id: song.song_id,
            title: song.title,
            year: song.year,
            bpm: song.bpm,
            energy: song.energy,
            danceability: song.danceability,
            loudness: song.loudness,
            liveness: song.liveness,
            valence: song.valence,
            duration: song.duration,
            acousticness: song.acousticness,
            speechiness: song.speechiness,
            popularity: song.popularity,
            artist: {
                artist_id: song.artist_id,
                artist_name: song.artist_name
            },
            genre: {
                genre_id: song.genre_id,
                genre_name: song.genre_name
            }
        }));
        res.json(result);
    });

    // Grabs songs with the given artist ID
    app.get('/api/songs/artist/:artist_id', (req, res) => {

        const songs = db.prepare(`
            SELECT 
            s.song_id,
            s.title,
            s.year,
            s.bpm,
            s.energy,
            s.danceability,
            s.loudness,
            s.liveness,
            s.valence,
            s.duration,
            s.acousticness,
            s.speechiness,
            s.popularity,
            s.artist_id,
            a.artist_name,
            g.genre_id,
            g.genre_name
            FROM songs AS s
            INNER JOIN artists AS a ON s.artist_id = a.artist_id
            INNER JOIN genres AS g ON s.genre_id = g.genre_id
            WHERE s.artist_id = ?
            `).all(req.params.artist_id);
        if(!songs.length) return res.status(404).json({ error: `No songs found for artist id: ${req.params.artist_id}` });
        
        const result = songs.map(song => ({
            song_id: song.song_id,
            title: song.title,
            year: song.year,
            bpm: song.bpm,
            energy: song.energy,
            danceability: song.danceability,
            loudness: song.loudness,
            liveness: song.liveness,
            valence: song.valence,
            duration: song.duration,
            acousticness: song.acousticness,
            speechiness: song.speechiness,
            popularity: song.popularity,
            artist: {
                artist_id: song.artist_id,
                artist_name: song.artist_name
            },
            genre: {
                genre_id: song.genre_id,
                genre_name: song.genre_name
            }
        }));
        res.json(result);
    })

    // Grabs songs with the given genre ID
    app.get('/api/songs/genre/:genre_id', (req, res) => {

        const songs = db.prepare(`
            SELECT 
            s.song_id,
            s.title,
            s.year,
            s.bpm,
            s.energy,
            s.danceability,
            s.loudness,
            s.liveness,
            s.valence,
            s.duration,
            s.acousticness,
            s.speechiness,
            s.popularity,
            s.artist_id,
            a.artist_name,
            g.genre_id,
            g.genre_name
            FROM songs AS s
            INNER JOIN artists AS a ON s.artist_id = a.artist_id
            INNER JOIN genres AS g ON s.genre_id = g.genre_id
            WHERE s.genre_id = ?
            `).all(req.params.genre_id);
        if(!songs.length) return res.status(404).json({ error: `No songs found for genre id: ${req.params.genre_id}` });
        
        const result = songs.map(song => ({
            song_id: song.song_id,
            title: song.title,
            year: song.year,
            bpm: song.bpm,
            energy: song.energy,
            danceability: song.danceability,
            loudness: song.loudness,
            liveness: song.liveness,
            valence: song.valence,
            duration: song.duration,
            acousticness: song.acousticness,
            speechiness: song.speechiness,
            popularity: song.popularity,
            artist: {
                artist_id: song.artist_id,
                artist_name: song.artist_name
            },
            genre: {
                genre_id: song.genre_id,
                genre_name: song.genre_name
            }
        }));
        res.json(result);
    })
}
