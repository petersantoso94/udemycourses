import * as React from "react";
import { useUsersQuery, useHelloQuery } from "../generated/graphql";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = props => {
  const { data } = useUsersQuery({ fetchPolicy: "network-only" }); // not from gql cache

  const hello = useHelloQuery({ fetchPolicy: "network-only" });
  if (!data || !hello.data) return <div>Loading...</div>;
  return (
    <div>
      <header>Users: </header>
      <div>
        <ul>
          {data.users.map(x => (
            <li key={x.id}>
              email: {x.email}, id: {x.id}
            </li>
          ))}
        </ul>
      </div>

      <header>
        Hello : * succeed login will see hi! here: {hello.data?.hello}
      </header>
    </div>
  );
};

export default Home;
