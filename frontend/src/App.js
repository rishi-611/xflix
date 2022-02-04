import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import VideoScreen from "./pages/VideoScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/video/:id" component={VideoScreen} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
