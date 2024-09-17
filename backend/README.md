# AdventureWorks Backend

## Installation Instructions

### 1. Backend Setup
- Navigate to the `backend` folder.
- Install dependencies:  

```bash
  npm install
```

 ### Set up environment variables
- Create a `.env` file in the `backend` folder with the following content:

```env
  DB_USER=sysuser
  DB_PASSWORD=sysuser
  DB_SERVER=localhost
  DB_PORT=1433
  DB_DATABASE=AdventureWorks2022
  DB_ENCRYPT=false
  DB_ENABLE_ARITH_ABORT=true
```
### Database Setup

1. **Install Microsoft SQL Server (MSSQL)**:
   - Download and install [MSSQL](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) on your local machine.

2. **Download AdventureWorks Database**:
   - Download the AdventureWorks database from [this link](https://github.com/microsoft/sql-server-samples/releases).
   - Follow the instructions to restore the database on your MSSQL server.

3. **Create a Database User**:
   - Open SQL Server Management Studio (SSMS).
   - Create a new login with the following credentials:
     - **Username**: `sysuser`
     - **Password**: `sysuser`
   - Ensure this user has access to the `AdventureWorks2022` database.
4. **Add the Password field to Products**
    - In the SQL Server Management Studio (SMSS) open a new query and execute:
```sql
    use AdventureWorks2022
    go
    ALTER TABLE Person.Person
    ADD password nvarchar(50) NULL;
    go
    update [Person].[Person]
    set password = '123'
    where BusinessEntityID = 4;
    go
```
    you will be able to login with the user "Walters" and password "123" in the Frontend

4. **Ensure the Server is Running on Port 1433**:
   - Verify that MSSQL is running on port `1433` (the default SQL Server port) and that the firewall allows connections to this port.

5. **Install the service**
    Execute in the command prompt
```node
    npm install
```

6. **Run the service**
    Execute in the command prompt
```node
    node app.js
```

7. **Run tests**
    Execute in the command prompt
```node
    npm test
```