
import React, { useState } from 'react';
import { Search, Plus, Code, Users, Star, ExternalLink } from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProjectDetailsModal from './ProjectDetailsModal';
import CreateProjectTeamModal from './CreateProjectTeamModal';
import JoinRequestModal from '../JoinRequestModal';

const ProjectTeamsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechStack, setSelectedTechStack] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Dummy data for projects
  const projects = [
    {
      id: 1,
      title: "AI-Powered Code Review Assistant",
      description: "Building an intelligent tool that provides automated code reviews with suggestions for improvements and bug detection.",
      techStack: ["React", "Python", "TensorFlow", "Node.js"],
      owner: {
        name: "Sarah Chen",
        avatar: "SC",
        username: "@sarahchen"
      },
      compatibility: 88,
      githubLink: "https://github.com/sarahchen/ai-code-review",
      liveDemo: "https://ai-code-review.demo.com",
      isRequested: false,
      detailedDescription: "This project aims to revolutionize the code review process by using machine learning to identify potential bugs, suggest improvements, and maintain coding standards automatically."
    },
    {
      id: 2,
      title: "Sustainable Fashion Marketplace",
      description: "Creating a platform that connects eco-conscious consumers with sustainable fashion brands and second-hand clothing.",
      techStack: ["Vue.js", "Firebase", "Stripe", "Node.js"],
      owner: {
        name: "Marcus Johnson",
        avatar: "MJ",
        username: "@marcusj"
      },
      compatibility: 65,
      githubLink: "https://github.com/marcusj/eco-fashion",
      liveDemo: null,
      isRequested: false,
      detailedDescription: "Building a comprehensive marketplace that promotes sustainable fashion through verified eco-friendly brands, clothing swap features, and carbon footprint tracking."
    },
    {
      id: 3,
      title: "Mental Health Chatbot",
      description: "Developing an AI companion to provide mental health support and resources for students and young professionals.",
      techStack: ["React Native", "Python", "OpenAI", "PostgreSQL"],
      owner: {
        name: "Emily Rodriguez",
        avatar: "ER",
        username: "@emilyrod"
      },
      compatibility: 45,
      githubLink: "https://github.com/emilyrod/mental-health-bot",
      liveDemo: null,
      isRequested: true,
      detailedDescription: "Creating a compassionate AI chatbot that can provide immediate mental health support, resource recommendations, and crisis intervention capabilities."
    }
  ];

  const techStacks = ["all", "React", "Vue.js", "Python", "Node.js", "TensorFlow", "Firebase"];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = selectedTechStack === 'all' || project.techStack.includes(selectedTechStack);
    return matchesSearch && matchesTech;
  });

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  const handleRequestJoin = (project) => {
    setSelectedProject(project);
    setShowJoinModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4 items-center">
            {/* Tech Stack Filter */}
            <select
              value={selectedTechStack}
              onChange={(e) => setSelectedTechStack(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {techStacks.map(tech => (
                <option key={tech} value={tech}>
                  {tech === 'all' ? 'All Tech Stacks' : tech}
                </option>
              ))}
            </select>

            {/* Create Project Team Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              Create Project Team
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onViewDetails={() => handleViewDetails(project)}
            onRequestJoin={() => handleRequestJoin(project)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Code size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search filters or create a new project team.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Create Project Team
          </button>
        </div>
      )}

      {/* Modals */}
      {showDetailsModal && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setShowDetailsModal(false)}
          onRequestJoin={() => {
            setShowDetailsModal(false);
            handleRequestJoin(selectedProject);
          }}
        />
      )}

      {showCreateModal && (
        <CreateProjectTeamModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={(projectData) => {
            console.log('Creating project team:', projectData);
            setShowCreateModal(false);
          }}
        />
      )}

      {showJoinModal && (
        <JoinRequestModal
          team={selectedProject}
          onClose={() => setShowJoinModal(false)}
          onConfirm={() => {
            console.log('Joining project:', selectedProject.title);
            setShowJoinModal(false);
          }}
          type="project"
        />
      )}
    </div>
  );
};

export default ProjectTeamsTab;
