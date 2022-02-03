import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Home />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
