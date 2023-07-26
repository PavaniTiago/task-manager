import { router } from "./routes";
import express from 'express';

const app = express(); 

app.use(express.json());
app.use(router);

app.listen(3001, () => console.log('App running on port 3001'));