import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./home";
import Question from "./question";
import SignIn from "./login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { browserHistory } from './react-router'
// import { useSelector, useDispatch } from "react-redux";

function App() {
  // const { loggedIn } = useSelector((state) => state);
  // useEffect(() => {
  //   if (document.location.pathname != "/login" && !loggedIn.length>0)
  //     // window.location.pathname = "/login";
  //     browserHistory.push('/login')
  //     if(document.location.pathname == "/login" && loggedIn.length>0)
  //     // window.location.pathname = "/";
  //     browserHistory.push('/')
  //     console.log('loggedIn has been changes',loggedIn)
  // }, [loggedIn]);
  // if (!loggedIn.length > 0) {
  //   // not logged in so redirect to login page with the return url
  //   return <Redirect to={{ pathname: "/login" }} />;
  // }
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<SignIn />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/Question/:id" element={<Question/>}/>
        {/* <Route path="/LeaderBoard" element={<LeaderBoard/>}/> */}
        {/* <Route path="/Add" element={<Add/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
