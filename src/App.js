import React, { useEffect, useState } from 'react';
import './styles/App.css'
import PostList from './Components/PostList';
import PostForm from './Components/PostForm';
import PostFilter from './Components/PostFilter';
import MyModal from './Components/UI/modal/MyModal';
import MyButton from './Components/UI/button/MyButton';
import { usePosts } from './Components/hooks/usePosts';
import PostService from "./Api/PostService";
import Loader from "./Components/UI/loader/Loader";
import { useFetching } from "./Components/hooks/useFetching";
import { getPageCount, getPagesArray } from "./utils/pages";
import Pagination from "./Components/UI/pagination/Pagination";

function App() {
  const [ posts, setPosts ] = useState([])
  const [ filter, setFilter ] = useState({ sort: '', query: '' })
  const [ modal, setModal ] = useState(false)
  const [ totalPages, setTotalPages ] = useState(0)
  const [ limit, setLimit ] = useState(10)
  const [ page, setPage ] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)


  const [ fetchPosts, isPostsLoading, postError ] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts()
  }, [ page ])

  const createPost = (newPost) => {
    setPosts([ ...posts, newPost ])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
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


      { postError &&
        <h1>Произошла ошибка: { postError }</h1>
      }

      { isPostsLoading
        ? <div style={ { display: 'flex', justifyContent: 'center', marginTop: '50px' } }><Loader/></div>
        : <PostList remove={ removePost } posts={ sortedAndSearchedPosts } title='Посты про JS'/>
      }

      <Pagination
        page={ page }
        totalPages={ totalPages }
        changePage={ changePage }
      />

    </div>
  );
}

export default App;
