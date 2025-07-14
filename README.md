# 👨‍💼 Employee Management System with Azure Deployment(React + ASP.NET Core Web API)

A production-ready employee management platform built with **React** and **ASP.NET Core Web API**, backed by ** MySQL on Azure Flexible Server**. It includes CRUD operations, advanced chart visualizations, PDF reporting via RDLC, and live search—all with responsive UI and clean architecture.

---

## 🚀 Features

- Add / Edit / Delete Employees
- Live Search across all fields
- Age Auto-Calculation based on DOB
- Salary-based Chart Visualizations (Pie, Bar, Line)
- RDLC-powered PDF Reports (Employee listing)
- Form Validations
- Responsive UI using Material UI + Bootstrap

---

## 🧱 Architecture

- **Frontend**: React + Material UI + Bootstrap  
- **Backend**: ASP.NET Core Web API with EF Core  
- **Database**: MySQL on Azure  
- **Reports**: RDLC for PDF/Excel exports

---

## 🏗️ Project Structure

### Frontend (`employeemanagement.ui`)

    src/
      Components/
        EmployeeChart.js
        EmployeeChartDialog.js
        EmployeeForm.js
        EmployeeList.js
        EmployeeManagement.js
        EmployeeSearch.js
        EmployeeToolbar.js
        ReportDialog.js
      App.js
      index.js
      index.css

### Backend

#### API Layer (`EmployeeManagement_API`)

    Controllers/
      EmployeeController.cs
      ReportsController.cs
    Program.cs
    appsettings.json

#### Data Layer (`EmployeeManagement_DAL`)

    Data/
      EmployeeDbContext.cs
    Models/
      Employee.cs
      States.cs
    Repository/
      EmployeeRepository.cs
      IEmployeeRepository.cs

---

## 🖥️ Backend Setup (ASP.NET Core Web API)

### 📦 Required NuGet Packages

#### API Project

    Install-Package Swashbuckle.AspNetCore.Swagger -Version 8.1.4
    Install-Package Swashbuckle.AspNetCore.SwaggerGen -Version 8.1.4
    Install-Package Swashbuckle.AspNetCore.SwaggerUI -Version 8.1.4

#### DAL Project

    Install-Package Microsoft.EntityFrameworkCore -Version 8.0.13
    Install-Package Microsoft.EntityFrameworkCore.Design -Version 8.0.13
    Install-Package Microsoft.EntityFrameworkCore.Tools -Version 8.0.13
    Install-Package Pomelo.EntityFrameworkCore.MySql -Version 8.0.3

---

### 🔧 Connection String Configuration

#### Local MySQL

    "DefaultConnection": "Server=localhost;Database=EmployeeManagementDb;User=root;Password=YourPassword;"

#### Azure MySQL

    "DefaultConnection": "Server=employeemysqlservermp.mysql.database.azure.com;Port=3306;Database=EmployeeDB;Uid=myadmin;Pwd=Mp@143677;SslMode=Preferred;"

---

### 🧱 EF Core Migrations

    Add-Migration InitialCreate
    Update-Database

---

### 🌐 CORS Setup (Optional)

In `Program.cs`, allow React frontend access if hosted elsewhere (e.g., `http://localhost:3000`).

---

### ▶️ Run Backend

1. Set `EmployeeManagement_API` as the startup project
2. Run via Visual Studio (`F5`)
3. Access Swagger UI at:

    https://your-api-name.azurewebsites.net/swagger/index.html

---

## ⚙️ Frontend Setup (React)

### 📁 Clone Repo

    git clone https://github.com/your-username/employee-management-app.git
    cd employee-management-app

### 📦 Install Dependencies

    npm install

### 📦 Required Libraries

    npm install react-bootstrap bootstrap
    npm install @mui/material @emotion/react @emotion/styled
    npm install @mui/icons-material
    npm install chart.js react-chartjs-2

### ▶️ Start React App

    npm start

> App runs at: [http://localhost:3000](http://localhost:3000)

---

## 📈 Chart Visualizations

Rendered with `Chart.js` + `react-chartjs-2` for salary insights by designation:
- Pie Chart  
- Bar Chart  
- Line Chart  

---

## 🧾 PDF Reporting

- RDLC-powered backend reports
- Exports available via `ReportsController`
- Generates PDFs of employee data

---

## ☁️ Azure Deployment

### ✅ API Hosted at:

    https://your-api-name.azurewebsites.net

### ✅ Database Hosted at:

    your-azure-dbname.mysql.database.azure.com

---

## 🚚 Migrate Local MySQL Data to Azure

### 🔁 Export Local DB

    mysqldump -u root -p employeemanagementdb > dump.sql

### 📥 Import to Azure

    mysql -h employeemysqlservermp.mysql.database.azure.com -P 3306 -u myadmin -p EmployeeDB < dump.sql

---

## 📬 Contact

For queries or support:  
📧 [Mahadeopimpalkar6@gmail.com](mailto:Mahadeopimpalkar6@gmail.com)

---

