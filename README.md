# CampusLostFound

## Problem
Students lose items on campus and have no single place to report or find them. CampusLostFound lets students post lost and found items so they can get back to their owners.

## Users
- Student: registers, logs in, reports lost or found items, and edits or deletes their own reports
- Admin: reviews all reports and updates report status

## Features
- Register and login (bcrypt password hashing + JWT)
- Create lost and found reports, and update or delete your own
- Search and filter reports by type and status
- Admin can review all reports and update status
- Responsive design with loading, empty and error states

## Tech Stack
MongoDB Atlas, Express, React (Vite), Node.js. Hosted on Render.

## Live Links
- Website: https://campuslostandfound-1.onrender.com
- API: https://campuslostandfound-dkjn.onrender.com/api/items


## Environment Variables (names only)
- Server: PORT, MONGODB_URI, JWT_SECRET, NODE_ENV, CLIENT_ORIGIN
- Client: VITE_API_URL

## Known Limitations
- Free hosting is slow after inactivity

## Future Improvements
-  image upload for reports