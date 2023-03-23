import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../Api/PostService";
import Loader from "../Components/UI/loader/Loader";

const PostIdPage = () => {

  const params = useParams()
  const [ post, setPost ] = useState({})
  const [ fetchPostById, isLoading, error ] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data)
    console.log(response.data)
  })

  useEffect(() => {
    fetchPostById(params.id)
  }, [])

  return (
    <div>
      <h1>Вы попали на страницу поста c ID: { params.id }</h1>
      {isLoading
        ? <Loader/>
        : <div>{post.id}. {post.title}</div>

      }
    </div>
  );
};

export default PostIdPage;