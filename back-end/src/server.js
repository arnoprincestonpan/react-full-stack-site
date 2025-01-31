import express from 'express';
import {MongoClient, ServerApiVersion} from 'mongodb';

// non-database JSON data
const articleInfo = [
    { name: 'learn-node', upvotes: 0, comments: [] },
    { name: 'learn-react' ,upvotes: 0, comments: [] },
    { name: 'mongodb', upvotes: 0, comments: [] },
]

const app = express();

let db;

async function connectToDB(){
    const uri = 'mongodb://127.0.0.1:27017';

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            struct: true,
            deprecationErrors: true,
        }
    });

    await client.connect();
    db = client.db('full-stack-react-db');
}

app.use(express.json());

app.get("/api/articles/:name", async (req, res) => {
    const {name} = req.params;

    const article = await db.collection('articles').findOne({name});

    res.json(article);
})

app.post('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;

    const articles = await db.collection("articles").findOneAndUpdate({ name },
        {
            $inc: {
                upvotes: 1
            }
        },
        {
            returnDocument: "after"
        }
    );
    res.json(articles);
})

// comments endpoint
app.post('/api/articles/:name/comments', async (req, res) =>{
    const {name} = req.params;
    // const name = req.params; will assign the entire req.params to name, you'll need to do req.params.name
    const { postedBy, text} = req.body;
    // this is the JSON information that is required in the body of the POST request

    const newComment = { postedBy, text};

    const article = await db.collection('articles').findOneAndUpdate({ name }, { 
        $push: {
            comments: { postedBy, text }
        }
     },
     {
        returnDocument: "after"
     }
    )

    res.json(article);
});

async function start(){
    await connectToDB();
    app.listen(8000, function(){
        console.log('Server is running on port 8000');
    })
}

start();
