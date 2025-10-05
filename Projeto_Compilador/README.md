# O Meu Eu Digital – Web Engineering 2025

**Final Project – Engenharia Web**  
**Date:** 1 June 2025  

A digital diary application that allows users to record, organize, and explore their personal data chronologically and semantically. The project provides a structured, personalized representation of a user's life, supporting multiple content types such as text, images, and events.

---

## 🎯 Core Objectives
- Create a web application representing the user's digital self.  
- Support chronological and semantic organization of content.  
- Implement secure user authentication and role-based access control.  
- Enable submission, storage, and retrieval of resources through SIP (Submission Information Package) and AIP (Archival Information Package).

---

## 🛠️ Architecture & Stack
- **Frontend (port 3001)**: Public and private web interface for user interaction.  
- **API (port 3000)**: Handles all data operations and content management.  
- **Database**: MongoDB for metadata, user accounts, and resource information.  
- **File System**: Physical storage of uploaded files using SHA256 checksums for organization.  
- **Authentication**: Implemented with Passport.js for session management and access control.  
- **Containerization**: Docker for modular deployment of frontend, API, and database.  

**Flow:**  
User interacts with the frontend → Frontend communicates with API → API accesses database or file system as needed.

---

## 💡 Key Features
### Content Management
- Chronological timeline of user content.  
- Content classified by **type** and **tags** (controlled taxonomy).  
- Metadata per entry: title, description, date, visibility (private/public), comments.  
- Private content visible only in backoffice; public content accessible in frontoffice.  

### SIP Ingestion
- Validation of `manifesto-SIP.json` and referenced files.  
- Verification of content tags.  
- Storage of metadata in MongoDB and files in filesystem.  

### AIP Storage
- Metadata in MongoDB.  
- Files stored using SHA256 checksums:  
  - First 2 characters → folder  
  - Remaining characters → file name  
- Efficient file management avoiding collisions, scalable storage.

---

## 👥 User Roles
### Produtor
- Create and manage personal content.  
- Make items public or private.  
- Submit SIPs, remove entries, edit profile.

### Consumidor
- Access public content only.  
- Explore resources chronologically or semantically.  
- Comment on resources, edit own profile.

### Administrador
- Access backoffice for user and content management.  
- Edit profile and moderate resources.

---

## 🔄 Content Dissemination (DIP)
- List and view public resources.  
- Download files individually.  
- Export individual items for offline use.

---

## 🧪 Testing & Validation
- SIP submission and ingestion tests with real files.  
- Error handling for missing files or invalid manifests.  
- Resource creation, modification, and viewing tests.  
- Authentication and permission checks.  
- File organization and retrieval validation.  

---

## 🚀 Future Improvements
- Integration with social media platforms (Facebook, Twitter, Strava).  
- Support for additional content types (video, maps, etc.).  
- Personalized dashboards for producers.  
- Tag- and history-based recommendation system.  
- Logging and dynamic ingestion system.  

---

This project demonstrates a full-stack web application with secure user management, scalable file handling, and structured content organization, providing a robust representation of the user's digital self.
