import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    console.log(appwriteService.getFileView(featuredImage));
  return (
    
    <Link to={`/post/${$id}`}>
        <div className='w-full rounded-xl p-4 h-[400px]'>
            <div className='w-full justify-center mb-4 '>
                <img src={appwriteService.getFileView(featuredImage)} alt={title}
                className='rounded-xl h-[300px]' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard