
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { X, Plus, Upload } from 'lucide-react';

const EditProjectModal = ({ open, onClose, project, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: [],
    githubLink: '',
    liveLink: '',
    image: '',
    status: 'unknown' // <-- add this line
  });
  const [currentTech, setCurrentTech] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        techStack: project.techStack || [],
        githubLink: project.githubLink || '',
        liveLink: project.liveLink || '',
        image: project.image || '',
        status: project.status || ''
      });
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTech = () => {
    if (currentTech.trim() && !formData.techStack.includes(currentTech.trim())) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, currentTech.trim()]
      }));
      setCurrentTech('');
    }
  };

  const removeTech = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(tech => tech !== techToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTech();
    }
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Edit Project
          </DialogTitle>
          
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Project Title *
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter project title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description *
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your project..."
              rows={4}
              required
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tech Stack
            </label>
            <div className="flex gap-2 mb-3">
              <Input
                value={currentTech}
                onChange={(e) => setCurrentTech(e.target.value)}
                placeholder="Add technology (e.g., React, Node.js)"
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button type="button" onClick={addTech} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="on-hold">On Hold</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>


          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                GitHub Link
              </label>
              <Input
                type="url"
                value={formData.githubLink}
                onChange={(e) => setFormData(prev => ({ ...prev, githubLink: e.target.value }))}
                placeholder="https://github.com/username/repo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Live Demo Link
              </label>
              <Input
                type="url"
                value={formData.liveLink}
                onChange={(e) => setFormData(prev => ({ ...prev, liveLink: e.target.value }))}
                placeholder="https://your-project.com"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Project Image
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={loading || !formData.title.trim() || !formData.description.trim()}
            >
              {loading ? 'Updating...' : 'Update Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectModal;
