import { Outlet } from 'react-router-dom'
import './Posts.scss'


const Posts = () => {


  return (
    <div className='posts'>
        <div className="posts__content">
            <Outlet />
        </div>
    </div>
  )
}

export default Posts;