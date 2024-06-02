# IssueTracker_Client_Web

Welcome to the IssueTracker!

## 📓 Table of Contents

- Project Overview
- Features
- Architecture
- Technologies Used
- Setup and Installation
- Usage
- Contributors

## ☘️ Project Overview


This project was developed as a part of Software Engineering. The objective was to create an Issue Management System that allows users to manage project tasks efficiently. The system supports functionalities like creating issues, assigning tasks, setting priorities, and tracking the progress of issues.

### Actions Allowed by Role

- **Admin**
    - Create, edit, and delete projects
    - Add accounts and roles related to the project (Admin must be assigned ADMIN !!!)
- **Project Lead (PL)**
    - Delete issues
    - Assign Dev to issues with status NEW
    - Change the status of issues from RESOLVED to CLOSED
    - Reopen issues with status CLOSED/DISPOSED
    - Dispose of any issue that is not in CLOSED status
- **Developer (Dev)**
    - Change the status of issues assigned to them to FIXED after fixing
- **Tester**
    - Create and edit issues they have created
    - Change the status of their created issues from FIXED to RESOLVED if resolved correctly
- **All**
    - Create, edit, and delete comments

## 🗂️ Features

- User authentication and authorization
- Project create, read, update, delete
- Issue create, read, update, delete
- Comment create, read, update, delete for issues
- Assign issues to developers
- Role-based issue state management
- Set issue priority
- Statistical reporting and dashboard
- Assignee recommendation

## 🖇️ Architecture


The system is designed with a layered architecture, including the following components:

- **Backend:** Spring Boot for RESTful API development.
- **Database:** H2 Database for development and testing.
- **Frontend:** React.js, Unity
- **Testing:** JUnit5 for unit and integration tests.

### Entity Relationship Diagram
![image](https://github.com/CAU-SWE-Team4/IssueTracker_Client_Web/assets/84865066/8d5b6f4b-e73e-45fc-8e39-785bf04335f0)


## 🛠️ Technologies Used

- **Backend:** Java, Spring Boot, JPA/Hibernate
- **Frontend:** React.js, Unity
- **Database:** H2
- **Testing:** JUnit5, Mockito
- **Version Control:** GitHub

## ✨ Setup and Installation



### Prerequisites
- Node.js and npm for front-web

### Installation Steps
1. Clone this repository

```bash
$ git clone https://github.com/CAU-SWE-Team4/IssueTracker_Client_Web.git
$ cd IssueTracker_Client_Web
$ cd issue_tracker
```

1. Install npm

```bash
$ npm install
```

1. Start

```bash
$ npm start
```

## 🎀 Usage


After setting up the system, you can access it via a web browser at `http://localhost:3000` 

## 👯‍♀️ Contributors


Software Engineering Class 02 Team 4

| name | id | mail | github | role |
| --- | --- | --- | --- | --- |
| Kim Minsik | 20194198 | ppp37686@gmail.com | https://github.com/pius338 | Web-client |
| Kim Yeojin | 20216645 | yeojin7010@gmail.com | https://github.com/lucete012 | Server, Web-client  |
| Kim Junseob | 20216793 | davidkim020409@gmail.com | https://github.com/benzenekim | Game-client |
| Lee Hun-ui | 20206861 | gnsdml1@cau.ac.kr | https://github.com/HN-UI | Documentation |
| Chang Minseok | 20203361 | minseok128128@gmail.com | https://github.com/minseok128 | Server |
