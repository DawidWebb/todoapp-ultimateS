import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { CreateAccountPage, MainViev, TaskPage } from "../../vievs";

function MainSwitch() {
  const login = useSelector((store) => store.login);

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <MainViev />} />
        <Route
          exact
          path="/create-account"
          render={() => <CreateAccountPage />}
        />
        {login.length ? (
          <Route exact path="/tasks" render={() => <TaskPage />} />
        ) : (
          ""
        )}
        <Redirect to="/" />
        {/* <Route component={ErrorPage} /> */}
      </Switch>
    </>
  );
}
export default MainSwitch;
