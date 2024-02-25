import 'dotenv/config';
import path from 'path'
import chalk from 'chalk';
import express from 'express';


const app = express();
const PORT = process.env.PORT || 8001;


app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

app.get('/', (req, res)=> {
    res.render('home');
})

app.listen(PORT, () => console.log(chalk.bgGreen.inverse(`Server listening on ${PORT}`)));