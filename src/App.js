import React, { useEffect, useState } from 'react';
import './styles/App.css'
import PostList from './Components/PostList';
import PostForm from './Components/PostForm';
import PostFilter from './Components/PostFilter';
import MyModal from './Components/UI/modal/MyModal';
import MyButton from './Components/UI/button/MyButton';
import { usePosts } from './Components/hooks/usePosts';
import axios from "axios";
import PostService from "./Api/PostService";
import Loader from "./Components/UI/loader/Loader";

function App() {
  const [ posts, setPosts ] = useState([])
  const [ filter, setFilter ] = useState({ sort: '', query: '' })
  const [ modal, setModal ] = useState(false)
  const [ isPostsLoading, setIsPostsLoading ] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    setIsPostsLoading(true)
    setTimeout(async () => {
      const posts = await PostService.getAll()
      setPosts(posts)
      setIsPostsLoading(false)
    }, 1000)
  }

  const createPost = (newPost) => {
    setPosts([ ...posts, newPost ])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className='App'>
      <MyButton style={ { marginTop: 30 } } onClick={ () => setModal(true) }>
        Создать пост
      </MyButton>
      <MyModal visible={ modal } setVisible={ setModal }>
        <PostForm create={ createPost }/>
      </MyModal>
      <hr style={ { margin: '15px 0' } }/>
      <PostFilter filter={ filter } setFilter={ setFilter }/>
      {isPostsLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
        : <PostList remove={ removePost } posts={ sortedAndSearchedPosts } title='Посты про JS'/>
      }
    </div>
  );
}

export default App;
