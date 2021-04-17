// React router
import { Route, Switch } from "react-router-dom";

// Components
import { Navbar, NavItem } from "./Components/Navbar";

// Pages
import Home from "./Pages/Home"
import About from "./Pages/About";
import Compare from "./Pages/Compare";
import Error from "./Pages/Error"

import Class from "./Pages/Class";
import Course from "./Pages/Course";
import Instructor from "./Pages/Instructor"

import Departments from "./Pages/Departments"
import Courses from "./Pages/Courses"
import Instructors from "./Pages/Instructors";

function App() {
  return (
    <div className="App">
      <Navbar>
        <NavItem route="/departments">Departments</NavItem>
        <NavItem route="/instructors">Instructors</NavItem>
        <NavItem route="/compare">Compare</NavItem>
      </Navbar>

      <main>
        <Switch>

          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/about" exact>
            <About />
          </Route>

          <Route path="/compare" exact>
            <Compare />
          </Route>

          <Route path="/courses" exact>
            <Courses />
          </Route>

          <Route path="/course/:courseID" exact>
            <Course />
          </Route>

          <Route path="/class/:classID">
            <Class />
          </Route>

          <Route path="/departments" exact>
            <Departments />
          </Route>

          <Route path="/department/:department">
            <Courses />
          </Route>

          <Route path="/instructors" exact>
            <Instructors />
          </Route>

          <Route path="/instructors/:letter">
            <Instructors />
          </Route>

          <Route path="/instructor/:instructorID">
            <Instructor />
          </Route>

          <Route path="/error/:code">
            <Error />
          </Route>

          <Route path="*">
            <Error />
          </Route>

        </Switch>
      </main>

    </div>
  );
}

export default App;
