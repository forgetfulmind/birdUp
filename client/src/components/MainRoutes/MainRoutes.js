import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Members from "../../pages/members"
import LogIn from "../../pages/login/login"
import SubmitBird from "../../pages/submitBird"
import Earth from "../../pages/earth/earth"
import UserPosts from "../../pages/UserPosts/UserPosts"
import PrivateRoute from "../ProtectedRoute/ProtectedRoute"

export default function MainRoutes() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <LogIn />
          </Route>
          <PrivateRoute path="/members" component={Members}>
            <Members />
          </PrivateRoute>
          <PrivateRoute path="/submitBird" component={SubmitBird}>
            <SubmitBird />
          </PrivateRoute>
          <PrivateRoute path="/earth" component={Earth} >
            <Earth />
          </PrivateRoute>
          <PrivateRoute path="/post/:id" component={UserPosts} >
            <UserPosts />
          </PrivateRoute>
        </Switch>
      </Router>
    );
  }