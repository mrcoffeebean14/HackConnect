
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Github, ExternalLink, Calendar, Tag } from 'lucide-react';

const ProjectDetailsModal = ({ open, onClose, project }) => {
  if (!project) return null;

  const { title, description, techStack, githubLink, liveLink, imageUrl, createdAt, status } = project;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          {imageUrl && (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className={`${getStatusColor(status)} font-medium capitalize`}>
                  {status.replace('-', ' ')}
                </Badge>
              </div>
            </div>
          )}

          {/* Project Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Description
                </h3>
                <p className="text-slate-600 leading-relaxed">{description}</p>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Created Date */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Created
                </h3>
                <p className="text-slate-600">{formatDate(createdAt)}</p>
              </div>

              {/* Project Links */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-800">Project Links</h3>
                <div className="space-y-2">
                  {githubLink && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => window.open(githubLink, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                    </Button>
                  )}
                  {liveLink && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => window.open(liveLink, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Demo
                    </Button>
                  )}
                </div>
              </div>

              {/* Additional Project Details */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-slate-800 mb-3">
                  Project Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Status:</span>
                    <Badge className={`${getStatusColor(status)} text-xs capitalize`}>
                      {status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Technologies:</span>
                    <span className="text-slate-800">{techStack.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Links:</span>
                    <span className="text-slate-800">
                      {[githubLink, liveLink].filter(Boolean).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            {githubLink && (
              <Button
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => window.open(githubLink, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsModal;
