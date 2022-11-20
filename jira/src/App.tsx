
import AuthenticatedApp from './authenticated-app';
import ErrorBoundary from './component/error-boundary';
import { FullPageErrorFallback } from './component/lib';
import { useAuth } from './context/auth-context';
import UnauthenticatedApp from './unauthenticated-app/Index';


function App() {
   const {user}=useAuth()
  return (
    <div className="App">
      
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
           {user?<AuthenticatedApp></AuthenticatedApp>:<UnauthenticatedApp></UnauthenticatedApp>}
      </ErrorBoundary>
  
    </div>
  );
}

export default App;
