# 👨‍💼 Employee Management System (React + ASP.NET Core Web API)

This application is a full-featured employee management system developed using **React** for the frontend and **ASP.NET Core Web API** for the backend. It supports CRUD operations, chart-based visualizations, live search, PDF reporting, and proper data validations.

## 🚀 Features

- **Add / Edit / Delete Employees**: Manage employee records with ease.
- **Live Search**: Search across all fields in real-time.
- **Form Validations**: Ensure data integrity with required fields, date rules, and salary checks.
- **Age Auto-Calculation**: Automatically calculate age based on Date of Birth.
- **Chart Visualizations**: Visualize salary by designation with Pie, Bar, and Line charts.
- **PDF Report Generation**: Generate employee list as PDF using jsPDF/autoTable.
- **Clean UI**: Styled with Material UI and Bootstrap for a modern look.

## 🏗️ Project Structure

The project follows a layered architecture with separate frontend and backend components.

### Frontend (`employeemanagement.ui`)

    src/
      Components/
        EmployeeChart.js        - Component for rendering charts (Pie, Bar, Line)
        EmployeeChartDialog.js  - Dialog for showing charts in a popup
        EmployeeForm.js         - Popup dialog for creating/editing employees
        EmployeeList.js         - Table for displaying employee list
        EmployeeManagement.js   - Main component orchestrating the app
        EmployeeSearch.js       - Search functionality for employees
        EmployeeToolbar.js      - Toolbar with action buttons
        ReportDialog.js         - Dialog for PDF download functionality
      App.js                    - Main React app entry point
      index.js                  - React app entry point
      index.css                 - Main CSS styles

### Backend

#### Business Logic Layer (`EmployeeManagement_API`)

    Controllers/
      EmployeeController.cs     - REST API endpoints for employee CRUD operations
    appsettings.json            - Configuration file (e.g., MySQL connection string)
    Program.cs                  - ASP.NET Core application entry point

#### Data Access Layer (`EmployeeManagement_DAL`)

    Data/
      EmployeeDbContext.cs      - Database context for MySQL using EF Core
    Models/
      Employee.cs               - Employee model
      States.cs                 - State model for dropdown
    Repository/
      EmployeeRepository.cs     - Data access logic for employees
      IEmployeeRepository.cs    - Interface for employee repository


## 🖥️ Backend Setup (ASP.NET Core Web API)

### 1. 🧰 Required NuGet Packages

Install these packages using the Package Manager Console in Visual Studio:

#### For EmployeeManagement_API Project

    Install-Package Swashbuckle.AspNetCore.Swagger -Version 8.1.4
    Install-Package Swashbuckle.AspNetCore.SwaggerGen -Version 8.1.4
    Install-Package Swashbuckle.AspNetCore.SwaggerUI -Version 8.1.4

#### For EmployeeManagement_DAL Project

    Install-Package Microsoft.EntityFrameworkCore -Version 8.0.13
    Install-Package Microsoft.EntityFrameworkCore.Design -Version 8.0.13
    Install-Package Microsoft.EntityFrameworkCore.Tools -Version 8.0.13
    Install-Package Pomelo.EntityFrameworkCore.MySql -Version 8.0.3

### 2. 🔧 MySQL Configuration

Ensure MySQL is installed and running on your machine (e.g., via MySQL Server on `localhost:3306`).

Update the `appsettings.json` file with your MySQL connection string:

    "ConnectionStrings": {
      "DefaultConnection": "Server=localhost;Database=EmployeeManagementDb;User=root;Password=YourPassword;"
    }

### 3. 🛠️ Database Setup with EF Core

Run the following commands in the Package Manager Console to create and apply migrations:

    Add-Migration InitialCreate
    Update-Database

This will create the `EmployeeManagementDb` database and necessary tables in MySQL.

### 4. 🌐 CORS Configuration (Optional)

If your frontend is hosted on a different domain/port (e.g., `localhost:3000`), enable CORS in the API project. Add the following to `Program.cs`:

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAll", builder =>
        {
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        });
    });

    app.UseCors("AllowAll");

### 5. ▶️ Run Backend

1. Open the solution in Visual Studio.
2. Set the Web API project as the startup project.
3. Press `F5` or click **Start** to run the backend.

The backend will run at: [https://localhost:xxxx/api/employees](https://localhost:xxxx/api/employees)

## ⚙️ Frontend Setup (React)

### 1. 📁 Clone the Repository

    git clone https://github.com/your-username/employee-management-app.git
    cd employee-management-app

### 2. 📦 Install Node Modules

    npm install

### 3. 🧩 Required Frontend Libraries

Install the necessary libraries for React, Material UI, Bootstrap, and Chart.js:

    npm install react-bootstrap bootstrap
    npm install @mui/material @emotion/react @emotion/styled
    npm install @mui/icons-material
    npm install chart.js react-chartjs-2

### 4. ▶️ Start React App

    npm start

The frontend will run at: [http://localhost:3000/](http://localhost:3000/)

## 📈 Charts (Salary by Designation)

The application supports the following chart types for visualizing salary by designation:

- **Pie Chart**
- **Bar Chart**
- **Line Chart**

Chart rendering is handled by [Chart.js](https://www.chartjs.org/) via the [react-chartjs-2](https://react-chartjs-2.js.org/) library.

## 🛠️ Technologies Used

- **Frontend**: React, Material UI, Bootstrap, Chart.js, react-chartjs-2
- **Backend**: ASP.NET Core Web API, MySQL with Entity Framework Core
- **Reporting**: jsPDF/autoTable for PDF generation


## 📬 Contact

For any inquiries, please reach out to [Mahadeopimpalkar6@gmail.com](mailto:your-email@example.com).
