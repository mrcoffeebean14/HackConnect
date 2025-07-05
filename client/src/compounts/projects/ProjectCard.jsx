import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Github, ExternalLink, Edit, Trash2, Eye } from 'lucide-react';

const ProjectCard = ({ project, onEdit, onDelete, onViewDetails }) => {
  // Provide default fallback values to avoid runtime errors
  const {
    title = 'Untitled Project',
    description = 'No description available.',
    techStack = [],
    githubLink,
    liveLink,
    image,
    status = 'unknown',
  } = project;

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

  return (
    <Card className="group bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image || '/api/placeholder/300/200'}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <Badge className={`${getStatusColor(status)} capitalize`}>
              {status?.replace('-', ' ')}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2 line-clamp-1">
              {title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {techStack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {techStack.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{techStack.length - 3} more
              </Badge>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-2">
            {githubLink && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(githubLink, '_blank');
                }}
                className="flex-1"
              >
                <Github className="w-4 h-4 mr-1" />
                Code
              </Button>
            )}
            {liveLink && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(liveLink, '_blank');
                }}
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Live
              </Button>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-slate-200">
            <Button
              size="sm"
              variant="ghost"
              onClick={onViewDetails}
              className="flex-1"
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onEdit}
              className="flex-1"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onDelete}
              className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
