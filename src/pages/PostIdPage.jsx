import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../Api/PostService";
import Loader from "../Components/UI/loader/Loader";

const PostIdPage = () => {

  const params = useParams()
  const [ post, setPost ] = useState({})
  const [ comment, setComment ] = useState([])

  const [ fetchPostById, isLoading, error ] = useFetching(async () => {
    const response = await PostService.getById(params.id)
    setPost(response.data)
  })
  const [ fetchComment, isComLoading, comError ] = useFetching(async () => {
    const response = await PostService.getCommentsByPostId(params.id)
    setComment(response.data)
  })

  useEffect(() => {
    fetchPostById()
    fetchComment()
  }, [])

  return (
    <div>
      <h1>Вы попали на страницу поста c ID: { params.id }</h1>
      {isLoading
        ? <Loader/>
        : <div>{post.id}. {post.title}</div>
      }
      <h1>
        Коментарии
      </h1>
      {isComLoading
        ? <Loader/>
        : <div style={{ marginTop: 15 }}>
          {comment.map(comm =>
            <div>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>)}
        </div>


      }
    </div>
  );
};

export default PostIdPage;