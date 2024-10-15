import app from './src/app.js';
import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT || 1004;

app.use(express.json());
app.use(cors());


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));




