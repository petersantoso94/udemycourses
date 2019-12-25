import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  memo,
  useMemo
} from "react";
// import axios from 'axios';
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
// import FullPost from "../FullPost/FullPost";
import Spinner from "../../../components/Spinner/Spinner";
import { Route } from "react-router";
import FullPost from "../FullPost/FullPost";

Posts.propTypes = {};

function Posts(props) {
  let counter = useRef(0);
  console.log("Posts rerendered: ", counter.current++);
  const totalPost = 10;
  const [posts, setPosts] = useState([]);
  const [errorSt, setErrorSt] = useState(false);
  //   const [selectedPostId, setSelectedPostId] = useState(null);
  useEffect(() => {
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, totalPost);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Max"
          };
        });
        setPosts(updatedPosts);
        // console.log( response );
      })
      .catch(error => {
        console.log(error);
        setErrorSt(true);
      });
  }, [setPosts, props]);

  const postSelectedHandler = useCallback(
    id => {
      //   setSelectedPostId(id);
      props.history.push(`/post/${id}`);
    },
    [props.history]
  );
  let postsOb = (
    <p
      style={{
        textAlign: "center"
      }}
    >
      Something went wrong!
    </p>
  );

  postsOb = useMemo(() => {
    if (errorSt) return [];
    return posts.map(post => {
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          id={post.id}
          clicked={postSelectedHandler}
        />
      );
    });
  }, [posts, errorSt, postSelectedHandler]);

  //post will be rerendered each thime posts re-rendered
  //   if (!errorSt)
  //     postsOb = posts.map(post => {
  //       return (
  //         <Post
  //           key={post.id}
  //           title={post.title}
  //           author={post.author}
  //           id={post.id}
  //           clicked={postSelectedHandler}
  //         />
  //       );
  //     });

  if (posts.length === 0) {
    return <Spinner />;
  }

  return (
    <div>
      <section className="Posts"> {postsOb} </section>
      <Route path={props.match.url + "/:id"} exact component={FullPost} />
      {/* <section>
        <FullPost id={selectedPostId} />
      </section> */}
    </div>
  );
}

export default memo(Posts);
