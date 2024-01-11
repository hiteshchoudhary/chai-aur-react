import React, {useEffect} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditPost() {
    const {slug} = useParams()
    const navigate = useNavigate()
    const post = useSelector(state => {
        return state.post.posts.find(post => post.$id === slug)
    })

    useEffect(() => {
        if(!slug || !post) {
            navigate('/')
        }
    }, [slug])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
