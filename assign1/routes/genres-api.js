export function genreRoutes(app, db) {

    app.get('/api/genres', (req, res) => {
        const genres = db.prepare('SELECT * FROM genres').all();
        if(!genres) return res.status(404).json({ error: `No genres Found` });
        res.json(genres);
    })
}
