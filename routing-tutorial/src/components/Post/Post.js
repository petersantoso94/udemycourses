import React, { useRef, memo } from "react";

import "./Post.css";
// import { withRouter } from "react-router";

const Post = props => {
  // console.log(props);
  let counter = useRef(0);
  console.log("Post rerendered: ", counter.current++);
  return (
    <article className="Post" onClick={() => props.clicked(props.id)}>
      <h1>{props.title}</h1>
      <div className="Info">
        <div className="Author">{props.author}</div>
      </div>
    </article>
  );
};

// export default withRouter(Post);
export default memo(Post);
