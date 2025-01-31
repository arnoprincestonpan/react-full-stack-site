import express from 'express';

// non-database JSON data
const articleInfo = [
    { name: 'learn-node', upvotes: 0, comments: [] },
    { name: 'learn-react' ,upvotes: 0, comments: [] },
    { name: 'mongodb', upvotes: 0, comments: [] },
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

// comments endpoint
app.post('/api/articles/:name/comments', (req, res) =>{
    const {name} = req.params;
    // const name = req.params; will assign the entire req.params to name, you'll need to do req.params.name
    const { postedBy, text} = req.body;
    // this is the JSON information that is required in the body of the POST request
    const article = articleInfo.find(a => a.name === name);
    // we're finding a name that matches the article name in the articleInfo array

    article.comments.push({
        postedBy,
        text
    });

    // JSON in PostMan
    // {
    //     "postedBy" : "Shawn",
    //     "text" : "Awesome article"
    // }


    res.json(article);
});

app.listen(8000, function(){
    console.log('Server is running on port 8000');
})
