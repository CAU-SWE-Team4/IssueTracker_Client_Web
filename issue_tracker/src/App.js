import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import IssueList from './components/IssueList';
import IssueDetail from './components/IssueDetail';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  const renderMainContent = () => {
    if (selectedIssue) {
      return <IssueDetail issue={selectedIssue} onClose={() => setSelectedIssue(null)} />;
    } else if (selectedProject) {
      return <IssueList project={selectedProject} onSelectIssue={setSelectedIssue} />;
    } else {
      return <></>;
    }
  };

  return (
    <div className="flex flex-col">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      {!isLoggedIn ? (
        <div className="flex justify-center items-center h-screen">
          {isRegistering ? (
            <Register onRegister={() => setIsRegistering(false)} onCancel={() => setIsRegistering(false)} />
          ) : (
            <Login onLogin={() => setIsLoggedIn(true)} onShowRegister={() => setIsRegistering(true)} />
          )}
        </div>
      ) : (
        <div className="flex flex-row">
          <div className="w-1/5 max-w-sm h-screen border-r">
            <ProjectList onSelectProject={setSelectedProject} />
          </div>
          <div className="w-4/5 h-screen">
            {renderMainContent()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
