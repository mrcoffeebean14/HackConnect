
import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectsList = ({ projects, loading, onEdit, onDelete, onViewDetails }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 p-6">
            <div className="animate-pulse">
              <div className="h-48 bg-slate-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-slate-200 rounded-full w-16"></div>
                <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                <div className="h-6 bg-slate-200 rounded-full w-14"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 bg-slate-200 rounded w-16"></div>
                <div className="h-8 bg-slate-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">No projects found</h3>
        <p className="text-slate-600 mb-6">Start by adding your first project to showcase your work</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={() => onEdit(project)}
          onDelete={() => onDelete(project.id)}
          onViewDetails={() => onViewDetails(project)}
        />
      ))}
    </div>
  );
};

export default ProjectsList;
