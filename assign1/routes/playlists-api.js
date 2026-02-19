export function playlistRoutes(app, db) {

    // Grabs all playlists with extra fields
    app.get('/api/playlists', (req, res) => {
        const playlist = db.prepare(`
            SELECT p.playlist_id, 
            s.song_id,
            s.title,
            a.artist_name,
            g.genre_name,
            s.year
            FROM playlists as p
            INNER JOIN songs as s ON p.song_id = s.song_id
            INNER JOIN artists as a ON s.artist_id = a.artist_id
            INNER JOIN genres as g ON s.genre_id = g.genre_id
            WHERE p.playlist_id = ?
            `).all();
        if(!playlist.length) return res.status(404).json({ error: `No Playlist Found` });
        res.json(playlist);
    })
    // Grabs playlists with given ID
    app.get('/api/playlists/:playlist_id', (req, res) => {
        const playlist = db.prepare(`
            SELECT p.playlist_id, 
            s.song_id,
            s.title,
            a.artist_name,
            g.genre_name,
            s.year
            FROM playlists as p
            INNER JOIN songs as s ON p.song_id = s.song_id
            INNER JOIN artists as a ON s.artist_id = a.artist_id
            INNER JOIN genres as g ON s.genre_id = g.genre_id
            WHERE p.playlist_id = ?
            `).all(req.params.playlist_id);
        if(!playlist.length) return res.status(404).json({ error: `No Playlist Found with ID: ${req.params.playlist_id}` });
        res.json(playlist);
    })
}
