// Lazily load pages
import React, { Suspense, lazy } from "react";

// React router
import { Route, Switch } from "react-router-dom";

// Components
import SearchBox from "./Components/SearchBox";
import GridPlaceholder from "./Components/Placeholders/GridPlaceholder";
import { Navbar, NavItem } from "./Components/Navbar";

// Lazily loaded pages
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Error = lazy(() => import("./Pages/Error"));
const Compare = lazy(() => import("./Pages/Compare"));

const Class = lazy(() => import("./Pages/Class"));
const Course = lazy(() => import("./Pages/Course"));
const Instructor = lazy(() => import("./Pages/Instructor"));

const Instructors = lazy(() => import("./Pages/Instructors"));
const Departments = lazy(() => import("./Pages/Departments"));
const Courses = lazy(() => import("./Pages/Courses"));

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
            <Suspense fallback={<GridPlaceholder />}>
              <Home />
            </Suspense>
          </Route>

          <Route path="/about" exact>
            <Suspense fallback={<GridPlaceholder />}>
              <About />
            </Suspense>
          </Route>

          <Route path="/compare" exact>
            <Suspense fallback={<GridPlaceholder />}>
              <Compare />
            </Suspense>
          </Route>

          <Route path="/course/:courseID" exact>
            <Suspense fallback={<GridPlaceholder><SearchBox category="classes" /></GridPlaceholder>}>
              <Course />
            </Suspense>
          </Route>

          <Route path="/class/:classID">
            <Suspense fallback={<GridPlaceholder />}>
              <Class />
            </Suspense>
          </Route>

          <Route path="/departments" exact>
            <Suspense fallback={<GridPlaceholder><SearchBox category="departments" /></GridPlaceholder>}>
              <Departments />
            </Suspense>
          </Route>

          <Route path="/department/:department">
            <Suspense fallback={<GridPlaceholder><SearchBox category="courses" /></GridPlaceholder>}>
              <Courses />
            </Suspense>
          </Route>

          <Route path="/instructors" exact>
            <Suspense fallback={<GridPlaceholder><SearchBox category="instructors" /></GridPlaceholder>}>
              <Instructors />
            </Suspense>
          </Route>

          <Route path="/instructors/:letter">
            <Suspense fallback={<GridPlaceholder><SearchBox category="instructors" /></GridPlaceholder>}>
              <Instructors />
            </Suspense>
          </Route>

          <Route path="/instructor/:instructorID">
            <Suspense fallback={<GridPlaceholder />}>
              <Instructor />
            </Suspense>
          </Route>

          <Route path="/error/:code">
            <Suspense fallback={<GridPlaceholder />}>
              <Error />
            </Suspense>
          </Route>

          <Route path="*">
            <Suspense fallback={<GridPlaceholder />}>
              <Error />
            </Suspense>
          </Route>

        </Switch>
      </main>

    </div>
  );
}

export default App;
