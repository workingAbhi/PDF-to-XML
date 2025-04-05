# PDF to XML Converter

A web application that converts PDF documents to structured XML format with user authentication and conversion history tracking.

![Homepage](ptx snips/ptx homepage)

## Features

- **User Authentication**: Secure signup and login
- **PDF to XML Conversion**: Convert PDFs to structured XML
- **Content Extraction**: Text, tables, images, and document structure
- **Conversion History**: Track all conversion activities

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js/Express
- PostgreSQL
- JWT authentication
- PDF-Parse

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pdf-to-xml.git
   cd pdf-to-xml
   ```

2. **Backend setup**
   ```bash
   cd server
   npm install
   ```

3. **Create PostgreSQL database**
   ```sql
   CREATE DATABASE pdf_to_xml;
   ```

4. **Configure environment**
   Create `.env` file:
   ```
   PORT=5000
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=pdf_to_xml
   DB_PASSWORD=your_password
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret
   ```

5. **Frontend setup**
   ```bash
   cd ../client
   npm install
   ```

6. **Start application**
   ```bash
   # Server
   npm start
   
   # Client (separate terminal)
   npm start
   ```

## Usage

1. Register or login
2. Upload PDF file
3. Convert to XML
4. View conversion history
5. Download XML files

## API Endpoints

- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `POST /api/conversions/convert` - Convert PDF
- `GET /api/conversions` - Get conversion history
- `GET /api/conversions/:id/download` - Download XML

## Database Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  original_filename VARCHAR(255) NOT NULL,
  pdf_file_path VARCHAR(255) NOT NULL,
  xml_file_path VARCHAR(255) NOT NULL,
  pdf_size INTEGER NOT NULL,
  xml_size INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
```
