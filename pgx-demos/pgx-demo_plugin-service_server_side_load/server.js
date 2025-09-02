import express from 'express';
import path from 'path';
import pgx from 'pgx-ka/all-recommendation-plugin';
import { fileURLToPath } from 'url';

const initialize = pgx.initialize;
const run = pgx.run;

const app = express();
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Wrap startup in an async function
async function startServer() {
  try {
    await initialize();
    console.log('PGX Knowledge Assembly initialized');

    app.post('/api/recommend', async (req, res) => {
      try {
        const result = await run(req.body);
        res.json(result);
      } catch (err) {
        console.error('Error in run():', err);
        res.status(500).json({ error: 'Failed to generate recommendation' });
      }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('Failed to initialize PGX KB:', err);
    process.exit(1);
  }
}

startServer();
