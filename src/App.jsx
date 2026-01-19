import { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import SearchBar from './components/SearchBar';
import DeleteConfirmation from './components/DeleteConfirmation';

// Initial employee data
const initialEmployees = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager',
    email: 'michael.chen@company.com',
    phone: '+1 (555) 234-5678'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    email: 'emily.rodriguez@company.com',
    phone: '+1 (555) 345-6789'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'DevOps Engineer',
    email: 'david.kim@company.com',
    phone: '+1 (555) 456-7890'
  },
  {
    id: 5,
    name: 'Jessica Williams',
    role: 'Marketing Manager',
    email: 'jessica.williams@company.com',
    phone: '+1 (555) 567-8901'
  },
  {
    id: 6,
    name: 'Robert Taylor',
    role: 'Senior Developer',
    email: 'robert.taylor@company.com',
    phone: '+1 (555) 678-9012'
  }
];

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Load employees from localStorage or use initial data
  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      setEmployees(initialEmployees);
    }
  }, []);

  // Save employees to localStorage whenever they change
  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }, [employees]);

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => {
    const searchLower = searchTerm.toLowerCase();
    return (
      employee.name.toLowerCase().includes(searchLower) ||
      employee.role.toLowerCase().includes(searchLower) ||
      employee.email.toLowerCase().includes(searchLower)
    );
  });

  // Sort employees
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const aValue = a[sortBy].toLowerCase();
    const bValue = b[sortBy].toLowerCase();
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Add new employee
  const handleAddEmployee = (employeeData) => {
    const newEmployee = {
      ...employeeData,
      id: Date.now()
    };
    setEmployees([...employees, newEmployee]);
    setShowForm(false);
  };

  // Update existing employee
  const handleUpdateEmployee = (employeeData) => {
    setEmployees(employees.map(emp => 
      emp.id === editingEmployee.id ? { ...employeeData, id: emp.id } : emp
    ));
    setEditingEmployee(null);
    setShowForm(false);
  };

  // Delete employee
  const handleDeleteEmployee = (id) => {
    setDeleteConfirmation(id);
  };

  const confirmDelete = () => {
    setEmployees(employees.filter(emp => emp.id !== deleteConfirmation));
    setDeleteConfirmation(null);
  };

  // Edit employee
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Close form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Employee Management System</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your team efficiently</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Employee
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Stats */}
        <div className="mb-6">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm}
          />
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <span className="font-medium">{sortedEmployees.length}</span>
            <span className="ml-1">
              {sortedEmployees.length === 1 ? 'employee' : 'employees'} found
            </span>
            {searchTerm && (
              <span className="ml-1">
                matching "{searchTerm}"
              </span>
            )}
          </div>
        </div>

        {/* Employee List */}
        <EmployeeList
          employees={sortedEmployees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
        />

        {/* Empty State */}
        {sortedEmployees.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding a new employee'}
            </p>
          </div>
        )}
      </main>

      {/* Employee Form Modal */}
      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
          onClose={handleCloseForm}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <DeleteConfirmation
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirmation(null)}
          employeeName={employees.find(emp => emp.id === deleteConfirmation)?.name}
        />
      )}
    </div>
  );
}

export default App;
