import Home from "../components/home";
import { observer } from "mobx-react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default observer(App);
