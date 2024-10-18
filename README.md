Here’s an updated `README.md` file with the simplified content and the information you provided:

`markdown
# Ticket Management System

This project is a Ticket Management System built with **React** for the frontend and **ASP.NET Core (.NET 8)** for the backend. The application allows users to manage support tickets by creating, updating, and deleting tickets.

## Project Structure

- **Frontend**: Located in the `ticket-management` folder.
- **Backend**: Located in the `ticketApi` folder.
- **Database Backup**: The database backup file is located in the `DB bak` folder.

## Technologies Used

- **Frontend**: React, Tailwind CSS, Material-UI
- **Backend**: ASP.NET Core (.NET 8)
- **Database**: SQL Server Express

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server Express](https://www.microsoft.com/en-us/sql-server)

## Setup Instructions
```

### . Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd ticketApi
   ```

2. **Update the connection string in `appsettings.json`**
   In the `appsettings.json` file, update the `ConnectionStrings` section:
   ```json
   "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR_SERVER_NAME\\SQLEXPRESS;Database=TicketDB;User Id=TicketUser;Password=HahnTask123_;TrustServerCertificate=True;MultipleActiveResultSets=true"
   }
   ```
   Replace `YOUR_SERVER_NAME` with the actual name of your SQL Server instance.

3. **Create the database**
   Run the following command to set up the database:
   ```bash
   dotnet ef database update
   ```

4. **Run the backend**
   ```bash
   dotnet run
   ```
   The backend should now be running at `http://localhost:5209`.

### 3. Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd ../ticket-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the frontend**
   ```bash
   npm start
   ```
   The frontend should now be running at `http://localhost:3000`.

### 4. Database Setup

To restore the database, use the `.bak` file located in the `DB bak` folder:

1. Open SQL Server Management Studio.
2. Right-click on the **Databases** node and select **Restore Database**.
3. Choose the `.bak` file from the `DB bak` folder and follow the instructions to restore.

## What to Change in the Connection String

- Update the `Server` name in the connection string to match your local SQL Server instance.
- Make sure the `User Id` and `Password` match the database user you created.

## Running Tests

To run unit tests, use the following commands:

#### Frontend Tests
```bash
npm test
```


## Notes

- The project uses **Tailwind CSS** and **Material-UI** for styling.
- Make sure both frontend and backend are running simultaneously for the application to work.

---

Now you're ready to run the Ticket Management System. For any issues, double-check the configuration and make sure all prerequisites are installed.
