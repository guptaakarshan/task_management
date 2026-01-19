# Employee Management System

A modern, polished single-page application (SPA) built with React for managing employee records. Features full CRUD operations, search functionality, sorting, and data persistence using localStorage.

## Features

### Core Functionality
- **Employee List**: View all employees in a clean, organized table (desktop) or card layout (mobile)
- **Add Employee**: Create new employee records with form validation
- **Edit Employee**: Update existing employee information
- **Delete Employee**: Remove employees with confirmation dialog
- **Search/Filter**: Real-time search by name, role, or email
- **Sorting**: Click column headers to sort by name or role (ascending/descending)
- **Data Persistence**: All changes are saved to localStorage and survive page refreshes

### UI/UX Features
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Modern Styling**: Clean, professional design using Tailwind CSS
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Visual feedback for user actions
- **Empty States**: Helpful messages when no employees are found
- **Confirmation Dialogs**: Safe deletion with confirmation prompts

## Tech Stack

- **React 18** - Modern React with functional components and hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **localStorage** - Client-side data persistence

## Project Structure

```
internship_project/
├── src/
│   ├── components/
│   │   ├── EmployeeList.jsx      # Main employee table/list component
│   │   ├── EmployeeForm.jsx      # Add/Edit employee form with validation
│   │   ├── SearchBar.jsx         # Search functionality
│   │   └── DeleteConfirmation.jsx # Delete confirmation modal
│   ├── App.jsx                    # Main app component with state management
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles and Tailwind imports
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage Guide

### Adding an Employee
1. Click the "Add Employee" button in the header
2. Fill out the form with employee details (Name, Role, Email, Phone)
3. Required fields are marked with an asterisk (*)
4. Click "Add Employee" to save

### Editing an Employee
1. Click the "Edit" button on any employee row
2. Update the information in the form
3. Click "Update Employee" to save changes

### Deleting an Employee
1. Click the "Delete" button on any employee row
2. Confirm the deletion in the dialog
3. The employee will be removed from the list

### Searching Employees
- Type in the search bar to filter employees by name, role, or email
- Results update in real-time as you type
- Click the X icon to clear the search

### Sorting Employees
- Click on "Name" or "Role" column headers to sort
- Click again to toggle between ascending and descending order
- Active sort column is indicated by an arrow icon

## State Management

The app uses React hooks for state management:
- `useState` - For managing component state
- `useEffect` - For side effects (localStorage sync)

All employee data is stored in the component state and automatically synced with localStorage for persistence.

## Form Validation

The employee form includes comprehensive validation:
- **Name**: Required, minimum 2 characters
- **Email**: Required, must be valid email format
- **Role**: Required
- **Phone**: Optional, must be valid phone format if provided

Validation errors are displayed in real-time with helpful messages and visual indicators.

## Responsive Design

The app is fully responsive with:
- **Desktop**: Full table layout with sortable columns
- **Mobile/Tablet**: Card-based layout with stacked information
- **Touch-friendly**: Large tap targets for mobile devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


