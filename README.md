# CRIME RADAR

Crime Radar is a real-time crime mapping application built with React, Vite, Supabase, and the Google Maps API. It allows users to report and view crimes on an interactive map. The system includes role-based access for Admins, Officials, and Regular Users.

-----

## Features

  - Interactive map with crime markers.
  - Real-time crime reporting.
  - Role-based access:
      - **Admins**: Manage users.
      - **Officials**: Approve or reject reports.
      - **Regular Users**: Submit and view verified reports.
  - Backup system for restoring the database.
  - Can be restored even if the Supabase backend is deleted.

-----

## Getting Started

### 1\. Clone the Repository

```bash
git clone https://github.com/your-username/crime-radar.git
cd crime-radar
```

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Set Up Environment Variables

Create a `.env` file in the root directory of your project. You can use the `.env.example` file as a template.

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_Maps_API_KEY=your-google-maps-api-key
```

> **Note:** The `.env` file is excluded from version control via `.gitignore`.

-----

## Running the Application

Once the setup is complete, you can run the development server:

```bash
npm run dev
```

-----

## Backup and Restore

In case the Supabase project is deleted, the application can be fully restored using the included backup files.

### Step 1: Create a New Supabase Project

1.  Go to [supabase.com](https://app.supabase.com).
2.  Create a new project.
3.  Navigate to the database settings and save your new **Postgres password**.

### Step 2: Restore the Database Schema

1.  Open the `backup/schema.sql` file in a text editor.
2.  Copy the entire content.
3.  In your new Supabase project, go to the **SQL Editor**.
4.  Paste the copied content and click **RUN** to recreate the database schema.

### Step 3: Import Table Data

1.  In your Supabase project, go to the **Table Editor**.
2.  For each table listed, click on the table name.
3.  Click the options menu (three dots) and select **"Import Data from CSV"**.
4.  Choose the corresponding `.csv` file from the `backup/data/` directory.
5.  Repeat this process for every table.

### Step 4: Update Environment Variables

Replace the old Supabase URL and Anon Key in your `.env` file with the new credentials from your newly created Supabase project.

```env
VITE_SUPABASE_URL=https://your-new-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-new-anon-key
```

### Step 5: Run the Application

Re-install dependencies and run the development server to ensure everything is working correctly.

```bash
npm install
npm run dev
```