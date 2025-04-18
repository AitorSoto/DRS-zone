import React from "react";
import Chat from "./chat";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to DRS Zone</h1>
      <p>Explore the information about the f1 from its origins to 2022</p>
      <Chat />
    </div>
  );
};

export default Home;
