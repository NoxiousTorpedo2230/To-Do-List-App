import React, { useState, useEffect } from 'react';

const Todo = ({ user, token }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: ''
  });

  useEffect(() => {
    if (user && user._id && token) {
      fetchTodos();
    } else {
      console.error('Missing user or token:', { user: !!user, token: !!token });
      setError('Authentication error. Please login again.');
      setLoading(false);
    }
  }, [user, token]);

  const fetchTodos = async () => {
    try {
      setError(''); 
      const response = await fetch('http://localhost:5000/api/todos', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(`Failed to fetch todos: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required');
      setSubmitting(false);
      return;
    }
    try {
      const url = editingTodo 
        ? `http://localhost:5000/api/todos/${editingTodo._id}`
        : 'http://localhost:5000/api/todos';
      
      const method = editingTodo ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchTodos();
        resetForm();
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error || `Failed to ${editingTodo ? 'update' : 'create'} todo`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setFormData({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
    });
    setShowForm(true);
    setError(''); 
  };

  const handleDelete = async (todoId) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) {
      return;
    }

    try {
      setError('');
      const response = await fetch(`http://localhost:5000/api/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchTodos();
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(`Failed to delete todo: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      setError('Network error. Please try again.');
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      setError('');
      const response = await fetch(`http://localhost:5000/api/todos/${todo._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...todo,
          completed: !todo.completed
        })
      });

      if (response.ok) {
        await fetchTodos();
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(`Failed to update todo: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Toggle complete error:', error);
      setError('Network error. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: ''
    });
    setEditingTodo(null);
    setShowForm(false);
    setError('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#dc3545';
      case 'Medium': return '#ffc107';
      case 'Low': return '#28a745';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        fontSize: '16px',
        color: '#666'
      }}>
        Loading todos...
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px' 
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>My Todo List</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) resetForm();
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: showForm ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          {showForm ? 'Cancel' : 'Add New Todo'}
        </button>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      {showForm && (
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '30px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>
            {editingTodo ? 'Edit Todo' : 'Add New Todo'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                Title: <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                required
                maxLength="50"
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontSize: '14px'
                }}
                placeholder="Enter todo title"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                Description: <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                required
                maxLength="500"
                rows="3"
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  fontSize: '14px'
                }}
                placeholder="Enter todo description"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                Priority:
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleFormChange}
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontSize: '14px'
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                Due Date: <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleFormChange}
                required
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: '12px 24px',
                  backgroundColor: submitting ? '#6c757d' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  marginRight: '10px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                {submitting ? 'Saving...' : (editingTodo ? 'Update Todo' : 'Add Todo')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={submitting}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        {todos.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px', 
            color: '#666',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ color: '#999', marginBottom: '10px' }}>No todos yet</h3>
            <p style={{ margin: 0 }}>Add your first todo to get started!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '15px',
                backgroundColor: todo.completed ? '#f8f9fa' : 'white',
                opacity: todo.completed ? 0.7 : 1,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start' 
              }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    margin: '0 0 10px 0',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#666' : '#333',
                    fontSize: '18px'
                  }}>
                    {todo.title}
                  </h4>
                  <p style={{
                    margin: '0 0 12px 0',
                    color: todo.completed ? '#888' : '#666',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    lineHeight: '1.4'
                  }}>
                    {todo.description}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    gap: '20px', 
                    fontSize: '13px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      color: getPriorityColor(todo.priority),
                      fontWeight: 'bold',
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      border: `1px solid ${getPriorityColor(todo.priority)}`
                    }}>
                      {todo.priority} Priority
                    </span>
                    <span style={{ color: '#666' }}>
                      📅 Due: {formatDate(todo.dueDate)}
                    </span>
                    <span style={{ 
                      color: todo.completed ? '#28a745' : '#ffc107',
                      fontWeight: 'bold'
                    }}>
                      {todo.completed ? '✅ Completed' : '⏳ Pending'}
                    </span>
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  marginLeft: '20px',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => handleToggleComplete(todo)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: todo.completed ? '#ffc107' : '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    {todo.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    onClick={() => handleEdit(todo)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;