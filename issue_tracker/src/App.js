import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import IssueList from './components/IssueList';
import IssueDetail from './components/IssueDetail';
import Header from './components/Header';
import MenuList from './components/MenuList';
import MenuContent from './components/MenuContent'; // 예시로 만든 MenuContent 컴포넌트

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
      return <div>Select a project or menu to see the content</div>;
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 h-screen border-r">
        <Header />
        <ProjectList onSelectProject={setSelectedProject} onSelectMenu={setSelectedMenu} />
        <MenuList onSelectProject={setSelectedProject} onSelectMenu={setSelectedMenu} />
      </div>
      <div className="w-3/4 h-screen overflow-y-auto">
        {renderMainContent()}
      </div>
    </div>
  );
}

export default App;
