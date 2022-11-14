import React from 'react';

import ProjectListScreen from './screens/project-list';
import Text from './screens/project-list/text';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ProjectListScreen></ProjectListScreen>
        <Text></Text>
      </header>
    </div>
  );
}

export default App;
