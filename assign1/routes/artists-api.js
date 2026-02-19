export function artistRoutes(app, db) {

    // Grabs all info from artist table
    app.get('/api/artists', (req, res) => {
        const artists = db.prepare('SELECT * FROM artists').all()
        if(!artists) return res.status(404).json({ error: `No Artists Found` });
        res.json(artists);
    });

    // Grabs the averages of all song components from one artist by ID
    app.get('/api/artists/averages/:artist_id', (req, res) => {
        const averages = db.prepare(
            `SELECT a.artist_id,
            COUNT(s.song_id) AS num_songs, 
            ROUND(AVG(s.bpm), 0) AS average_bpm, 
            ROUND(AVG(s.energy), 0) AS average_energy, 
            ROUND(AVG(s.danceability), 0) AS average_danceability, 
            ROUND(AVG(s.loudness), 0) AS average_loudness, 
            ROUND(AVG(s.liveness), 0) AS average_liveness, 
            ROUND(AVG(s.valence), 0) AS average_valence, 
            ROUND(AVG(s.duration), 0) AS average_duration, 
            ROUND(AVG(s.acousticness), 0) AS average_acousticness, 
            ROUND(AVG(s.speechiness), 0) AS average_speechiness, 
            ROUND(AVG(s.popularity), 0) AS average_popularity 
            FROM artists AS a
            INNER JOIN songs AS s ON a.artist_id = s.artist_id
            WHERE a.artist_id = ?
            GROUP BY a.artist_id`
        ).get(req.params.artist_id);
        if(!averages) return res.status(404).json({ error: `Artist Not Found with id: ${req.params.artist_id}` });
        res.json(averages);
    });

    // Grabs one artist by ID
    app.get('/api/artists/:artist_id', (req, res) => {
        const artist = db.prepare('SELECT * FROM artists WHERE artist_id = ?').get(req.params.artist_id);
        if(!artist) return res.status(404).json({ error: `Artist Not Found with id: ${req.params.artist_id}` });
        res.json(artist);
    });

}