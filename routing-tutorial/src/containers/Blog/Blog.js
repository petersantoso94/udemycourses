import React, { useRef, Suspense } from "react";
import "./Blog.css";
import { Route, NavLink, Switch } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
const Posts = React.lazy(() => import("./Posts/Posts"));
const NewPost = React.lazy(() => import("./NewPost/NewPost"));
// import Posts from "./Posts/Posts";
// import NewPost from "./NewPost/NewPost";
const Blog = props => {
  let counter = useRef(0);
  console.log("Blog rerendered: ", counter.current++);
  return (
    <div>
      <header className="Blog">
        <nav>
          <ul>
            <li>
              <NavLink to="/post" exact activeClassName="active">
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to={{
                  pathname: "/post/new",
                  hash: "#submit",
                  search: "?abc=123"
                }}
              >
                New Post
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/post/new" component={NewPost} />
          <Route path="/post" component={Posts} />
          <Route render={() => <h1>404 NOT FOUND!</h1>} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Blog;
