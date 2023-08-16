import {useState} from 'react'
import './index.css'

const LikeUpdateDelete = props => {
  const {id, likeFun, deleteFun, updateFun} = props
  const [name, setName] = useState('')
  const likePost = () => {
    likeFun(id) // passing id value to ContentSharingPlatform component
  }

  const updatePost = () => {
    if (name !== '') {
      // if update text is empty we avoid that case
      updateFun(id, name)
      setName('') // after updated the input block should empty
    }
  }

  const deletePost = () => {
    deleteFun(id)
  }

  const updateText = event => {
    setName(event.target.value)
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        placeholder="Update Post"
        onChange={updateText}
        className="update-post"
      />
      <br />
      <button className="button" onClick={likePost} type="button">
        Like
      </button>
      <button className="button" type="button" onClick={updatePost}>
        Update
      </button>
      <button className="button" type="button" onClick={deletePost}>
        Delete
      </button>
      <hr />
    </div>
  )
}

export default LikeUpdateDelete
