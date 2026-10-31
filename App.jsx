
import { useState } from "react";

import {
  Home,
  Compass,
  MessageCircle,
  UserRound,
  Settings,
  Search,
  Bell,
  Image as ImageIcon,
  Heart,
  Send,
  Users,
  Camera,
  LogOut,
  Plus,
  X
} from "lucide-react";

import menImage from "./menImage.jpg";
import immage from "./immage.jpg";
import handImage from "./images.jpg";
import boyimage from "./boyimage.jpg";

import "./App.css";

function App() {

  // Current user
  const [currentUser, setCurrentUser] = useState({
    name: "Taha",
    bio: "Welcome to my social media profile!",
    image: menImage
  });

  // Page navigation
  const [page, setPage] = useState("Home");

  // Create post states
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Saimma Tahir",
      image: immage,
      text: "Good vibes only! Life is better when you focus on the good things.",
      postImage: handImage,
      likes: 12,
      liked: false,
      comments: ["Beautiful post!", "Amazing picture!"]
    },
    {
      id: 2,
      name: "Ahmed Anwar",
      image: boyimage,
      text: "Hello, my friends! I completed my web development project and delivered it on time. Thanks CodeAlpha for this opportunity.",
      postImage: "",
      likes: 8,
      liked: false,
      comments: ["Congratulations!", "Well done!"]
    }
  ]);

  // Like / Follow states
  const [following, setFollowing] = useState([]);

  // Comment states
  const [commentText, setCommentText] = useState({});
  const [showComments, setShowComments] = useState({});

  // Search
  const [searchText, setSearchText] = useState("");

  // Profile editing
  const [editName, setEditName] = useState(currentUser.name);
  const [editBio, setEditBio] = useState(currentUser.bio);

  // Messages
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "Ahmed",
      text: "Hello! How are you?"
    },
    {
      sender: "Taha",
      text: "I am fine. Thank you!"
    }
  ]);

  // Suggested people
  const people = [
    { id: 1, name: "Ahmed Anwar", image: boyimage },
    { id: 2, name: "Saimma Tahir", image: immage },
    { id: 3, name: "Taha", image: menImage }
  ];

  // Create new post
  const handlePost = () => {

    if (postText.trim() === "" && !postImage) {
      alert("Please write something or select an image!");
      return;
    }

    const newPost = {
      id: Date.now(),
      name: currentUser.name,
      image: currentUser.image,
      text: postText,
      postImage: postImage,
      likes: 0,
      liked: false,
      comments: []
    };

    setPosts([newPost, ...posts]);

    setPostText("");
    setPostImage("");
  };

  // Like and Unlike
  const handleLike = (id) => {

    setPosts(posts.map((post) => {

      if (post.id === id) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked
            ? post.likes - 1
            : post.likes + 1
        };
      }

      return post;
    }));
  };

  // Add comment
  const handleComment = (id) => {

    const text = commentText[id];

    if (!text || text.trim() === "") return;

    setPosts(posts.map((post) => {

      if (post.id === id) {
        return {
          ...post,
          comments: [...post.comments, text]
        };
      }

      return post;
    }));

    setCommentText({
      ...commentText,
      [id]: ""
    });
  };

  // Show / Hide comments
  const toggleComments = (id) => {
    setShowComments({
      ...showComments,
      [id]: !showComments[id]
    });
  };

  // Follow / Unfollow
  const handleFollow = (id) => {

    if (following.includes(id)) {

      setFollowing(
        following.filter((item) => item !== id)
      );

    } else {

      setFollowing([...following, id]);

    }
  };

  // Upload post image
  const handleImage = (event) => {

    const file = event.target.files[0];

    if (file) {
      setPostImage(URL.createObjectURL(file));
    }
  };

  // Update profile
  const handleProfileImage = (event) => {
  const file = event.target.files[0];

  if (file) {
    const imageURL = URL.createObjectURL(file);

    setCurrentUser({
      ...currentUser,
      image: imageURL
    });
  }
};

  const handleProfileUpdate = (event) => {
  event.preventDefault();

  setCurrentUser({
    ...currentUser,
    name: editName,
    bio: editBio
  });

  alert("Profile updated successfully!");
};


  // Send message
  const handleMessage = () => {

    if (messageText.trim() === "") return;

    setMessages([
      ...messages,
      {
        sender: "Taha",
        text: messageText
      }
    ]);

    setMessageText("");
  };

  // Search posts and users
  const filteredPosts = posts.filter((post) =>
    post.name.toLowerCase().includes(searchText.toLowerCase()) ||
    post.text.toLowerCase().includes(searchText.toLowerCase())
  );

  // Navigation items
  const navigation = [
    { name: "Home", icon: Home },
    { name: "Explore", icon: Compass },
    { name: "Messages", icon: MessageCircle },
    { name: "Profile", icon: UserRound },
    { name: "Notifications", icon: Bell },
    { name: "Settings", icon: Settings }
  ];

  return (

    <div className="app-container">

      {/* Navbar */}

      <nav className="navbar">

        <div className="brand">
          <Users size={35} />
          <h2>CodeAlpha</h2>
        </div>

        <div className="search-box">
          <Search size={20} />

          <input
            type="text"
            placeholder="Search posts and people..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setPage("Explore");
            }}
          />
        </div>

        <div className="navbar-profile">

          <button
            className="icon-button"
            onClick={() => setPage("Notifications")}
          >
            <Bell size={23} />
          </button>

          <img
            src={currentUser.image}
            alt="Profile"
            className="avatar"
            onClick={() => setPage("Profile")}
          />

          <span>{currentUser.name}</span>

        </div>

      </nav>


      {/* Main Layout */}

      <div className="main-layout">


        {/* Left Sidebar */}

        <aside className="sidebar">

          <div className="sidebar-links">

            {navigation.map((item) => {

              const Icon = item.icon;

              return (

                <button
                  key={item.name}
                  className={
                    page === item.name
                      ? "sidebar-link active"
                      : "sidebar-link"
                  }
                  onClick={() => setPage(item.name)}
                >

                  <Icon size={22} />
                  <span>{item.name}</span>

                </button>

              );

            })}

          </div>

          <div className="sidebar-bottom">
            <LogOut size={20} />
            <span>Logout</span>
          </div>

        </aside>


        {/* Main Content */}

        <main className="feed-container">


          {/* HOME PAGE */}

          {page === "Home" && (

            <>

              {/* Create Post */}

              <div className="create-post">

                <div className="create-post-top">

                  <img
                    src={currentUser.image}
                    alt="User"
                    className="avatar"
                  />

                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handlePost();
                    }}
                  />

                </div>

                {postImage && (

                  <div className="image-preview">

                    <img src={postImage} alt="Preview" />

                    <button
                      onClick={() => setPostImage("")}
                      className="remove-image"
                    >
                      <X size={18} />
                    </button>

                  </div>

                )}

                <div className="create-post-bottom">

                  <label className="upload-label">

                    <ImageIcon size={20} />
                    Photos

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      hidden
                    />

                  </label>

                  <button
                    className="post-button"
                    onClick={handlePost}
                  >
                    <Plus size={18} />
                    Post
                  </button>

                </div>

              </div>


              {/* Posts Feed */}

              {posts.map((post) => (

                <div className="post-card" key={post.id}>

                  <div className="post-header">

                    <img
                      src={post.image}
                      alt={post.name}
                      className="avatar"
                    />

                    <div className="post-user">

                      <h3>{post.name}</h3>
                      <span>Shared a post</span>

                    </div>

                  </div>


                  <p className="post-text">
                    {post.text}
                  </p>


                  {post.postImage && (

                    <img
                      src={post.postImage}
                      alt="Post"
                      className="post-image"
                    />

                  )}


                  {/* Like and Comment Buttons */}

                  <div className="post-stats">

                    <span>
                      <Heart size={16} />
                      {post.likes} Likes
                    </span>

                    <span>
                      {post.comments.length} Comments
                    </span>

                  </div>

                  <div className="post-actions">

                    <button
                      onClick={() => handleLike(post.id)}
                      className={post.liked ? "liked" : ""}
                    >
                      <Heart size={19} />
                      {post.liked ? "Liked" : "Like"}
                    </button>

                    <button
                      onClick={() => toggleComments(post.id)}
                    >
                      <MessageCircle size={19} />
                      Comment
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(
                          `${post.name}: ${post.text}`
                        );
                        alert("Post text copied!");
                      }}
                    >
                      <Send size={19} />
                      Share
                    </button>

                  </div>


                  {/* Comments Section */}

                  {showComments[post.id] && (

                    <div className="comments-section">

                      {post.comments.map((comment, index) => (

                        <div className="single-comment" key={index}>

                          <strong>{currentUser.name}</strong>
                          <span>{comment}</span>

                        </div>

                      ))}

                      <div className="comment-input">

                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={commentText[post.id] || ""}
                          onChange={(e) =>
                            setCommentText({
                              ...commentText,
                              [post.id]: e.target.value
                            })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleComment(post.id);
                            }
                          }}
                        />

                        <button
                          onClick={() => handleComment(post.id)}
                        >
                          <Send size={18} />
                        </button>

                      </div>

                    </div>

                  )}

                </div>

              ))}

              {posts.length === 0 && (
                <p>No posts yet. Create your first post!</p>
              )}

            </>

          )}


          {/* EXPLORE PAGE */}

          {page === "Explore" && (

            <section className="page-card">

              <h2>Explore</h2>
              <p>Discover people and posts.</p>

              <h3>Suggested People</h3>

              {people
                .filter((person) =>
                  person.name.toLowerCase().includes(
                    searchText.toLowerCase()
                  )
                )
                .map((person) => (

                  <div className="person-row" key={person.id}>

                    <img
                      src={person.image}
                      className="avatar"
                      alt={person.name}
                    />

                    <strong>{person.name}</strong>

                    {person.name !== currentUser.name && (

                      <button
                        className="follow-button"
                        onClick={() => handleFollow(person.id)}
                      >
                        {following.includes(person.id)
                          ? "Following"
                          : "Follow"}
                      </button>

                    )}

                  </div>

                ))}

              <h3>Recent Posts</h3>

              {filteredPosts.map((post) => (

                <div className="explore-post" key={post.id}>

                  <strong>{post.name}</strong>
                  <p>{post.text}</p>

                </div>

              ))}

            </section>

          )}


          {/* PROFILE PAGE */}

          {page === "Profile" && (

            <section className="page-card profile-page">

              <div className="profile-cover"></div>

              <img
                src={currentUser.image}
                alt="Profile"
                className="profile-avatar"
              />

              <h2>{currentUser.name}</h2>

              <p>{currentUser.bio}</p>

              <div className="profile-stats">

                <div>
                  <strong>
                    {posts.filter(
                      (post) => post.name === currentUser.name
                    ).length}
                  </strong>
                  <span>Posts</span>
                </div>

                <div>
                  <strong>{following.length}</strong>
                  <span>Following</span>
                </div>

                <div>
                  <strong>{following.length}</strong>
                  <span>Connections</span>
                </div>

              </div>

              <button
                className="post-button"
                onClick={() => setPage("Settings")}
              >
                Edit Profile
              </button>

              <h3>My Posts</h3>

              {posts
                .filter((post) => post.name === currentUser.name)
                .map((post) => (

                  <div className="explore-post" key={post.id}>
                    <p>{post.text}</p>

                    {post.postImage && (
                      <img
                        src={post.postImage}
                        alt="My post"
                        className="post-image"
                      />
                    )}

                  </div>

                ))}

            </section>

          )}


          {/* MESSAGES PAGE */}

          {page === "Messages" && (

            <section className="page-card">

              <h2>Messages</h2>

              <div className="chat-box">

                {messages.map((message, index) => (

                  <div
                    key={index}
                    className={
                      message.sender === "Taha"
                        ? "message own-message"
                        : "message"
                    }
                  >

                    <strong>{message.sender}</strong>
                    <p>{message.text}</p>

                  </div>

                ))}

              </div>

              <div className="message-input">

                <input
                  type="text"
                  placeholder="Write a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleMessage();
                  }}
                />

                <button onClick={handleMessage}>
                  <Send size={20} />
                </button>

              </div>

            </section>

          )}


          {/* NOTIFICATIONS PAGE */}

          {page === "Notifications" && (

            <section className="page-card">

              <h2>Notifications</h2>

              <div className="notification">
                <Heart size={20} />
                <span>Welcome to CodeAlpha Social Media!</span>
              </div>

              <div className="notification">
                <Users size={20} />
                <span>You have {following.length} following connections.</span>
              </div>

              <div className="notification">
                <MessageCircle size={20} />
                <span>You have {posts.reduce(
                  (total, post) => total + post.comments.length, 0
                )} comments on your posts feed.</span>
              </div>

            </section>

          )}


          {/* SETTINGS PAGE */}

          {page === "Settings" && (

            <section className="page-card">

              <h2>Account Settings</h2>

              <div className="settings-form">

  <form onSubmit={handleProfileUpdate}>
  <img
    src={currentUser.image}
    className="profile-avatar"
    alt="Profile"
  />

  <label>Change Profile Picture</label>
  <input
    type="file"
    accept="image/*"
    onChange={handleProfileImage}
  />

  <label>Full Name</label>
  <input
    type="text"
    value={editName}
    onChange={(e) => setEditName(e.target.value)}
    required
  />

  <label>Bio</label>
  <textarea
    value={editBio}
    onChange={(e) => setEditBio(e.target.value)}
  />

  <button type="submit">
    Save Changes
  </button>

</form>
  </div>
                

            </section>

          )}

        </main>


        {/* Right Sidebar */}

        <aside className="right-sidebar">

          <div className="suggested-card">

            <div className="suggested-heading">

              <h3>Suggested People</h3>

              <button onClick={() => setPage("Explore")}>
                See All
              </button>

            </div>

            {people.map((person) => (

              <div className="person-row" key={person.id}>

                <img
                  src={person.image}
                  alt={person.name}
                  className="avatar"
                />

                <div className="person-details">
                  <strong>{person.name}</strong>
                  <span>Suggested for you</span>
                </div>

                {person.name !== currentUser.name && (

                  <button
                    className="follow-button"
                    onClick={() => handleFollow(person.id)}
                  >
                    {following.includes(person.id)
                      ? "Following"
                      : "Follow"}
                  </button>

                )}

              </div>

            ))}

          </div>

        </aside>

      </div>

    </div>

  );

}

export default App;
