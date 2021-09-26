import { Fragment } from "react";
import { HashRouter as Router } from "react-router-dom";
import { HeaderViev } from "./vievs";
import { MainSwitch, Spinner, TaskInformation } from "./components";
function App() {
  return (
    <Router>
      <HeaderViev />
      <Fragment>
        <MainSwitch />
      </Fragment>
      <TaskInformation />
      <Spinner />
    </Router>
  );
}

export default App;
