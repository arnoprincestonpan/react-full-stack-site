import express from 'express';

// non-database JSON data
const articleInfo = [
    { name: 'learn-node', upvotes: 0 },
    { name: 'learn-react' ,upvotes: 0 },
    { name: 'mongodb', upvotes: 0 },
]

const app = express();

app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Hello World!');
})

app.get('/hello/:name', (req, res) => {
    res.send('Hello ' + req.params.name);
})

app.post('/hello/', (req,res)=>{
    res.send('Hello from a POST endpoint. Hi ' + req.body.name);
})

app.post('/api/articles/:name/upvote', (req, res) => {
    const article = articleInfo.find(a => a.name === req.params.name);
    article.upvotes += 1;
    res.send('Success! The article ' + req.params.name + " now has " + article.upvotes + " upvotes.");
})

app.listen(8000, function(){
    console.log('Server is running on port 8000');
})
