import React, {useState} from "react";
import './styles/App.css'
import PostItem from "./Components/PostItem";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript 1', body: 'Description'},
        {id: 2, title: 'Javascript 2', body: 'Description'},
        {id: 3, title: 'Javascript 3', body: 'Description'}
    ])

    return (
      <div className="App">
          {posts.map(post =>
              <PostItem post={post} key={post.id}/>
          )}
      </div>
    );
}

export default App;
