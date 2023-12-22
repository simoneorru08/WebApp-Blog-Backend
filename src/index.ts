import express from 'express';
import cors from 'cors';

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//Member api routes
app.use('/api/articoli', require('./routes/api/articoli'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ' + PORT));