import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import IssueList from './components/IssueList';
import IssueDetail from './components/IssueDetail';
import Header from './components/Header';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);

  return (
    <div className="flex">
      <div className="w-1/4 h-screen border-r">
        <Header />
        <ProjectList onSelectProject={setSelectedProject} />
      </div>
      <div className="w-3/4 h-screen overflow-y-auto">
        {selectedProject && (
          <IssueList
            project={selectedProject}
            onSelectIssue={setSelectedIssue}
          />
        )}
      </div>
      {selectedIssue && (
        <IssueDetail issue={selectedIssue} onClose={() => setSelectedIssue(null)} />
      )}
    </div>
  );
}

export default App;
