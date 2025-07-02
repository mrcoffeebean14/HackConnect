
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Plus, X, Code } from 'lucide-react';

const SkillsSection = ({ skills, updateSkills }) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      updateSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    updateSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestedSkills = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'C++', 'Go',
    'Machine Learning', 'AI/ML', 'Data Science', 'Cloud Computing', 'DevOps',
    'UI/UX Design', 'Mobile Development', 'Blockchain', 'Cybersecurity',
    'Game Development', 'AR/VR', 'IoT', 'Robotics', 'Web3'
  ];

  const availableSuggestions = suggestedSkills.filter(skill => !skills.includes(skill));

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-semibold text-slate-800">
          <Code className="w-5 h-5 mr-2 text-blue-600" />
          Skills & Technologies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Skill */}
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new skill..."
            className="flex-1"
          />
          <Button 
            onClick={addSkill}
            disabled={!newSkill.trim() || skills.includes(newSkill.trim())}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Current Skills */}
        {skills.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-2">Your Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:text-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Skills */}
        {availableSuggestions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-2">Suggested Skills</h4>
            <div className="flex flex-wrap gap-2">
              {availableSuggestions.slice(0, 12).map((skill) => (
                <Badge 
                  key={skill}
                  variant="outline"
                  className="cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => updateSkills([...skills, skill])}
                >
                  + {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <p className="text-sm text-slate-500">
          Add skills that represent your expertise and technologies you'd like to work with.
        </p>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
