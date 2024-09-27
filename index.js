import express from "express"
import bodyParser from "body-parser";
const app = express();


let posts = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Display posts on the home page
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// Serve the create post page
app.get('/create', (req, res) => {
  res.render('create');
});

// Handle post creation
app.post('/create', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: Date.now(), title, content };
  posts.push(newPost);
  res.redirect('/');
});

// Handle post deletion
app.post('/delete/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  posts = posts.filter(post => post.id !== postId);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
