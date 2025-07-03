
import React, { useState, useEffect } from 'react';
import { useToast } from '../hooks/use-toast'; // Import the useToast hook
import ProjectsList from '../compounts/projects/ProjectsList'; // Import the ProjectsList component
import ProjectActions from '../compounts/projects/ProjectActions'; // Import the ProjectActions component
import AddProjectModal from '../compounts/projects/AddProjectModal'; // Import the AddProjectModal component
import EditProjectModal from '../compounts/projects/EditProjectModal'; // Import the EditProjectModal component
import ProjectDetailsModal from '../compounts/projects/ProjectDetailsModal'; // Import the ProjectDetailsModal component
import ConfirmationDialog from '../compounts/projects/ConfirmationDialog'; // Import the ConfirmationDialog component
import NavbarDash from '../compounts/dashboard/NavbarDash'
import Sidebar from '../compounts/dashboard/Sidebar';
import Footer from '../compounts/home/Footer';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('My Projects');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const { toast } = useToast();

  // Mock data - replace with actual API calls
  const mockProjects = [
    {
      id: 1,
      title: 'Task Management App',
      description: 'A full-stack task management application with real-time updates and team collaboration features.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      githubLink: 'https://github.com/user/task-app',
      liveLink: 'https://task-app.demo.com',
      image: '/api/placeholder/300/200',
      createdAt: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      title: 'E-commerce Platform',
      description: 'Modern e-commerce platform with payment integration and inventory management.',
      techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
      githubLink: 'https://github.com/user/ecommerce',
      liveLink: 'https://shop.demo.com',
      image: '/api/placeholder/300/200',
      createdAt: '2024-02-20',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Real-time weather dashboard with location-based forecasts and interactive maps.',
      techStack: ['Vue.js', 'Express', 'OpenWeather API', 'Chart.js'],
      githubLink: 'https://github.com/user/weather-app',
      liveLink: 'https://weather.demo.com',
      image: '/api/placeholder/300/200',
      createdAt: '2024-03-10',
      status: 'completed'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        // const response = await fetch('/api/dashboard/projects');
        // const data = await response.json();
        setTimeout(() => {
          setProjects(mockProjects);
          setFilteredProjects(mockProjects);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error",
          description: "Failed to load projects",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  useEffect(() => {
    let filtered = projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [projects, searchTerm, sortBy]);

  const handleAddProject = async (projectData) => {
    try {
      // Replace with actual API call
      // const response = await fetch('/api/dashboard/projects', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(projectData)
      // });

      const newProject = {
        ...projectData,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        status: 'in-progress'
      };

      setProjects(prev => [newProject, ...prev]);
      setShowAddModal(false);
      toast({
        title: "Success",
        description: "Project added successfully!",
      });
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
    }
  };

  const handleEditProject = async (projectData) => {
    try {
      // Replace with actual API call
      // await fetch(`/api/dashboard/projects/${selectedProject.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(projectData)
      // });

      setProjects(prev => prev.map(p =>
        p.id === selectedProject.id ? { ...p, ...projectData } : p
      ));
      setShowEditModal(false);
      setSelectedProject(null);
      toast({
        title: "Success",
        description: "Project updated successfully!",
      });
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async () => {
    try {
      // Replace with actual API call
      // await fetch(`/api/dashboard/projects/${projectToDelete}`, {
      //   method: 'DELETE'
      // });

      setProjects(prev => prev.filter(p => p.id !== projectToDelete));
      setShowDeleteDialog(false);
      setProjectToDelete(null);
      toast({
        title: "Success",
        description: "Project deleted successfully!",
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  const handleDelete = (projectId) => {
    setProjectToDelete(projectId);
    setShowDeleteDialog(true);
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  return (
    <>
      <NavbarDash />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex">
          <Sidebar
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                My Projects
              </h1>
              <p className="text-slate-600">Manage and showcase your development projects</p>
            </div>

            <ProjectActions
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onAddProject={() => setShowAddModal(true)}
              projectCount={filteredProjects.length}
            />

            <ProjectsList
              projects={filteredProjects}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewDetails={handleViewDetails}
            />

            {/* Modals */}
            <AddProjectModal
              open={showAddModal}
              onClose={() => setShowAddModal(false)}
              onSubmit={handleAddProject}
            />

            <EditProjectModal
              open={showEditModal}
              onClose={() => {
                setShowEditModal(false);
                setSelectedProject(null);
              }}
              project={selectedProject}
              onSubmit={handleEditProject}
            />

            <ProjectDetailsModal
              open={showDetailsModal}
              onClose={() => {
                setShowDetailsModal(false);
                setSelectedProject(null);
              }}
              project={selectedProject}
            />

            <ConfirmationDialog
              open={showDeleteDialog}
              onClose={() => {
                setShowDeleteDialog(false);
                setProjectToDelete(null);
              }}
              onConfirm={handleDeleteProject}
              title="Delete Project"
              description="Are you sure you want to delete this project? This action cannot be undone."
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Projects;
