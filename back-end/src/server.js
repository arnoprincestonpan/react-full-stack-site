import express from 'express';

const articleInfo = [
    {articleName: 'learn-node', upvotes: 0},
    {articleName: 'learn-react', upvotes: 0},
    {articleName: 'mongodb', upvotes: 0}
];

const app = express();

app.use(express.json());

// Create Endpoints

// app.get('/hello', function (req, res) {
//     res.send('Hello!');
// })

app.get('/hello', function (req, res) {
    res.send('Hello! from GET!');
});

app.get("/hello/:name", function(req, res){
    res.send('Hello, ' + req.params.name);
});

app.post('/hello', function(req, res){
    res.send("Hello! " + req.body.name + ' from a POST endpoint!')
})

app.listen(8000, function(){
    console.log('Server is listening on port 8000');
});