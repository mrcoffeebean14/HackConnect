
import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const CreateTeamModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    techStack: [],
    project: '',
    maxMembers: 4
  });
  
  const [newTech, setNewTech] = useState('');

  // Dummy projects for dropdown
  const userProjects = [
    "AI Disease Prediction System",
    "Smart Home IoT Dashboard",
    "Cryptocurrency Portfolio Tracker",
    "Social Media Analytics Tool",
    "E-commerce Recommendation Engine"
  ];

  const popularTechs = [
    "React", "Vue.js", "Angular", "Node.js", "Python", "JavaScript", 
    "TypeScript", "Java", "C++", "Go", "Rust", "PHP", "Ruby",
    "TensorFlow", "PyTorch", "MongoDB", "PostgreSQL", "Firebase",
    "Docker", "Kubernetes", "AWS", "GCP", "Azure"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTechStack = (tech) => {
    if (tech && !formData.techStack.includes(tech)) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, tech]
      }));
      setNewTech('');
    }
  };

  const removeTechStack = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(tech => tech !== techToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.description.trim() && formData.techStack.length > 0) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create New Team</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Team Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your team name..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your team's goals and what you're looking for in teammates..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tech Stack *
            </label>
            
            {/* Add Tech Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Add technology..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechStack(newTech);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => addTechStack(newTech)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Popular Tech Suggestions */}
            <div className="mb-3">
              <p className="text-xs text-gray-600 mb-2">Popular technologies:</p>
              <div className="flex flex-wrap gap-2">
                {popularTechs.slice(0, 8).map(tech => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => addTechStack(tech)}
                    disabled={formData.techStack.includes(tech)}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Tech Stack */}
            {formData.techStack.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Selected technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.techStack.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechStack(tech)}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Project Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link to Project (Optional)
            </label>
            <select
              name="project"
              value={formData.project}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a project...</option>
              {userProjects.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
          </div>

          {/* Max Members */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Team Size
            </label>
            <select
              name="maxMembers"
              value={formData.maxMembers}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[2, 3, 4, 5, 6, 7, 8].map(size => (
                <option key={size} value={size}>{size} members</option>
              ))}
            </select>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.name.trim() || !formData.description.trim() || formData.techStack.length === 0}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamModal;
