import React from "react";
import GenrePanel from "../components/GenrePanel";
import Videos from "../components/Videos";
import Header from "../components/Header";
import HeaderForm from "../components/HeaderForm";

const Home = () => {
  return (
    <div>
      <Header>
        <HeaderForm />
      </Header>
      <GenrePanel />
      <Videos />
    </div>
  );
};

export default Home;
