export function playlistRoutes(app, db) {

    // Grabs all playlists with extra fields
    app.get('/api/playlists', (req, res) => {
        const rows = db.prepare(`
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
            `).all();
        if(!rows.length) return res.status(404).json({ error: `No Playlists Found` });
        // Group rows by playlist_id
        const grouped = rows.reduce((acc, row) => {
            // If this playlist_id hasn't been seen yet, create it
            if (!acc[row.playlist_id]) {
                acc[row.playlist_id] = {
                    playlist_id: row.playlist_id,
                    songs: []
                }
            }

            // Push the song into the matching playlist's songs array
            acc[row.playlist_id].songs.push({
                song_id: row.song_id,
                title: row.title,
                artist_name: row.artist_name,
                genre_name: row.genre_name,
                year: row.year,
            })

            return acc;
        }, {})

        // Convert the object into an array
        const playlists = Object.values(grouped);
        console.log(playlists);
        res.json(playlists);
        
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
