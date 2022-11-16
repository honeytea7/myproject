import React from 'react';
import AuthenticatedApp from './authenticated-app';
import { useAuth } from './context/auth-context';
import UnauthenticatedApp from './unauthenticated-app/Index';


function App() {
   const {user}=useAuth()
  return (
    <div className="App">
     {user?<AuthenticatedApp></AuthenticatedApp>:<UnauthenticatedApp></UnauthenticatedApp>}
    </div>
  );
}

export default App;
