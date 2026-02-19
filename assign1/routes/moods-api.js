export function moodRoutes(app, db) {

    // Grabs songs within the given limit, (up to 20), with the best dancing components to it
    app.get('/api/mood/dancing/:num', (req, res) => {

        let limit = parseInt(req.params.num);

        if(!limit || limit < 1 || limit > 20) limit = 20;
        
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
            ORDER BY s.danceability DESC
            LIMIT ?
            `).all(limit);
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

    // Grabs songs within the given limit, (up to 20), with the best valence components to it
    app.get('/api/mood/valence/:num', (req, res) => {

        let limit = parseInt(req.params.num);

        if(!limit || limit < 1 || limit > 20) limit = 20;
        
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
            ORDER BY s.valence DESC
            LIMIT ?
            `).all(limit);
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

    // Grabs songs within the given limit, (up to 20), with the best cafe vibe
    app.get('/api/mood/coffee/:num', (req, res) => {

        let limit = parseInt(req.params.num);

        if(!limit || limit < 1 || limit > 20) limit = 20;
        
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
            WHERE s.acousticness != 0
            ORDER BY (CAST(s.liveness AS REAL) / CAST(s.acousticness AS REAL)) DESC
            LIMIT ?
            `).all(limit);
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

    // Grabs songs within the given limit, (up to 20), with the least amount of talking and energy to it
    app.get('/api/mood/studying/:num', (req, res) => {

        let limit = parseInt(req.params.num);

        if(!limit || limit < 1 || limit > 20) limit = 20;
        
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
            WHERE s.acousticness != 0
            ORDER BY (CAST(s.energy AS REAL) + CAST(s.speechiness AS REAL)) ASC
            LIMIT ?
            `).all(limit);
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
}
