import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import LikeUpdateDelete from '../LikeUpdateDelete'
import './index.css'

class ContentSharingPlatform extends Component {
  state = {
    users: [],
    posts: [],
    newPost: '',
    name: '',
    mobileNo: '',
    searchText: '',
    activeUser: null,
    isAllow: false,
  }

  username = event => {
    this.setState({name: event.target.value})
  }

  mobileNumber = event => {
    this.setState({mobileNo: event.target.value})
  }

  showAlert = () => {
    // eslint-disable-next-line
    alert('Please Enter Username and Ten Digits mobile Number!')
  }

  createAccount = () => {
    const {name, mobileNo} = this.state
    const newUser = {name, mobileNo}
    if (name === '' || mobileNo === '' || mobileNo.length !== 10) {
      this.showAlert()
    } else {
      this.setState(prevState => ({
        users: [...prevState.users, newUser],
        activeUser: newUser,
        isAllow: true,
      }))
    }
  }

  createNewPost = event => {
    this.setState({newPost: event.target.value})
  }

  addNewPost = () => {
    const {activeUser, newPost} = this.state
    const newPostInfo = {
      id: uuidv4(), // npm provides uuid package to generate a unique id.
      user: activeUser,
      text: newPost,
      likes: 0,
    }
    this.setState(prevState => ({
      posts: [...prevState.posts, newPostInfo], // state is immutable so update state using spread operator
      newPost: '',
    }))
  }

  searchingPost = event => {
    this.setState({searchText: event.target.value})
  }

  clickLike = id => {
    const {posts} = this.state
    const updatedPosts = posts.map(
      item => (item.id === id ? {...item, likes: item.likes + 1} : item), // if condition is true item has updated else return itself
    )
    this.setState({posts: updatedPosts})
  }

  onDeletePost = id => {
    const {posts} = this.state
    const updatedPosts = posts.filter(item => item.id !== id)
    this.setState({posts: updatedPosts})
  }

  onUpdatePost = (id, newPost) => {
    const {posts} = this.state
    const updatedPosts = posts.map(item =>
      item.id === id ? {...item, text: newPost} : item,
    )
    this.setState({posts: updatedPosts})
  }

  render() {
    const {posts, activeUser, newPost, searchText, isAllow} = this.state
    const wantedPosts = posts.filter(item =>
      item.text.toLowerCase().includes(searchText.toLowerCase()),
    )
    return (
      <div className="container">
        <div>
          {activeUser === null ? (
            <div className="card">
              <h1 className="heading">Create Account</h1>
              <input
                type="text"
                className="username-mobileNo"
                onChange={this.username}
                placeholder="Enter Username"
              />
              <br />
              <input
                type="number"
                className="username-mobileNo"
                onChange={this.mobileNumber}
                placeholder="Enter Mobile Number"
              />
              <br />
              <button
                className="register-btn"
                type="button"
                onClick={this.createAccount}
              >
                Register
              </button>
            </div>
          ) : (
            <div className="main-card">
              <div className="createPost">
                <h1 className="content-heading">Content Sharing Platform</h1>
                <textarea
                  type="text"
                  className="post-content"
                  value={newPost}
                  placeholder="Enter your post"
                  onChange={this.createNewPost}
                />
                <br />
                <button
                  className="create-btn"
                  type="button"
                  onClick={this.addNewPost}
                >
                  Create Post
                </button>
              </div>
            </div>
          )}
          {isAllow && (
            <div className="main-content">
              <div>
                <h1 className="search-post">Searching Posts</h1>
                <input
                  type="text"
                  className="input-search"
                  placeholder="Search posts..."
                  onChange={this.searchingPost}
                />
                <br />
                <p className="posts">Posts</p>
                <ul className="unordered-list">
                  {wantedPosts.map(item => (
                    <li className="list-item" key={item.id}>
                      <p className="post-text">{item.text}</p>
                      <p className="likes-heading">
                        Likes: <span className="likes">{item.likes}</span>
                      </p>

                      <LikeUpdateDelete // to avoid for calling state elements from render we use additional component
                        key={item.id}
                        id={item.id}
                        likeFun={this.clickLike}
                        deleteFun={this.onDeletePost}
                        updateFun={this.onUpdatePost}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default ContentSharingPlatform
