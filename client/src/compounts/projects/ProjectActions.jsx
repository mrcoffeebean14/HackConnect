
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Search } from 'lucide-react';

const ProjectActions = ({ 
  searchTerm, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  onAddProject, 
  projectCount 
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 p-6 mb-8">
      <div className="flex flex-col gap-6">
        {/* Search Bar - Centered and Wide */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search projects by title, description, or tech stack..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white/60 border-slate-200/60 w-full"
            />
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full sm:w-48 bg-white/60 border-slate-200/60 " >
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent className=' bg-white'>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="alphabetical">A-Z</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              {projectCount} project{projectCount !== 1 ? 's' : ''}
            </span>
            
            <Button 
              onClick={onAddProject}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectActions;
