import Database from 'better-sqlite3';
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { artistRoutes } from './assign1/routes/artists-api.js';
import { genreRoutes } from './assign1/routes/genres-api.js';
import { songRoutes } from './assign1/routes/songs-api.js';
import { playlistRoutes } from './assign1/routes/playlists-api.js';
import { moodRoutes } from './assign1/routes/moods-api.js';

// Imports db
const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'data', 'songs-2026.db'));
const app = express();

// Grabs routes based on what needs to happen
artistRoutes(app, db);
genreRoutes(app, db);
songRoutes(app, db);
playlistRoutes(app,db);
moodRoutes(app, db);

app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});