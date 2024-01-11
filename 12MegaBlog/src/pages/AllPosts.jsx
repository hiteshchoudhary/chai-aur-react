import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux';

function AllPosts() {
  const posts = useSelector(state => state.post.posts)

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts
