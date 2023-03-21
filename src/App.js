import React, { useMemo, useState } from 'react';
import './styles/App.css'
import PostList from './Components/PostList';
import PostForm from "./Components/PostForm";
import PostFilter from "./Components/PostFilter";
import MyModal from "./Components/UI/modal/MyModal";
import MyButton from "./Components/UI/button/MyButton";

function App() {
  const [ posts, setPosts ] = useState([
    { id: 1, title: 'аа', body: 'бб' },
    { id: 2, title: 'гг', body: 'аа' },
    { id: 3, title: 'вв', body: 'яя' }
  ])

  const [ filter, setFilter ] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)

  const sortedPost = useMemo(() => {
    console.log('ОТРАБОТАЛА ФУНКЦИЯ СОРТЕД ПОСТС')
    if (filter.sort) {
      return [ ...posts ].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts
  }, [ filter.sort, posts ])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPost.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [ filter.query, sortedPost ])

  const createPost = (newPost) => {
    setPosts([ ...posts, newPost ])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className='App'>
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={ createPost }/>
      </MyModal>
      <hr style={ { margin: '15px 0' } }/>
      <PostFilter filter={ filter } setFilter={ setFilter }/>
      <PostList remove={ removePost } posts={ sortedAndSearchedPosts } title='Посты про JS'/>
    </div>
  );
}

export default App;
