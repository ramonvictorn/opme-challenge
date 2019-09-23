import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// screens
import ListUser from './views/ListUsers.jsx'

function AppRouter() {
    return (
      <Router>
          <Route path="/" component={ListUser} />
      </Router>
    );
  }
  
  export default AppRouter;