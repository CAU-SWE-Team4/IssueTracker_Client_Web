import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import IssueList from './components/IssueList';
import IssueDetail from './components/IssueDetail';
import Header from './components/Header';
import MenuList from './components/MenuList';
import MenuContent from './components/MenuContent';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const renderMainContent = () => {
    if (selectedIssue) {
      return <IssueDetail issue={selectedIssue} onClose={() => setSelectedIssue(null)} />;
    } else if (selectedMenu) {
      return <MenuContent menu={selectedMenu} />;
    } else if (selectedProject) {
      return <IssueList project={selectedProject} onSelectIssue={setSelectedIssue} />;
    } else {
      return <></>;
    }
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-row">
        <div className="w-1/5 h-screen border-r">
          <ProjectList onSelectProject={setSelectedProject} onSelectMenu={setSelectedMenu} />
          <MenuList onSelectProject={setSelectedProject} onSelectMenu={setSelectedMenu} />
        </div>
        <div className="w-4/5 h-screen">
          {renderMainContent()}
        </div>        
      </div>
    </div>
  );
}

export default App;
