import { Fragment } from "react";
import { HashRouter as Router } from "react-router-dom";
import { HeaderViev } from "./vievs";
import {
  MainSwitch,
  Spinner,
  TaskInformation,
  TasksListModal,
} from "./components";
function App() {
  return (
    <Router>
      <HeaderViev />
      <Fragment>
        <MainSwitch />
      </Fragment>
      <TasksListModal />
      <TaskInformation />
      <Spinner />
    </Router>
  );
}

export default App;
