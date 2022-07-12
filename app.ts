import express, { Request, Response } from "express";
import routes from './router';
const app = express();
import "./database"
app.use(express.json())
app.use('/', routes)
app.get('/', (req: Request, res: Response) => {
    res.send('Requst success')
})
let port="6000"
app.listen(port, () => {
    console.log('server is running at',port)
})
