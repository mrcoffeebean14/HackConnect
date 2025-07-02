
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Link, Github, Linkedin, Twitter, Globe } from 'lucide-react';

const SocialLinksSection = ({ socials, updateSocialData }) => {
  const socialPlatforms = [
    {
      key: 'github',
      label: 'GitHub',
      icon: Github,
      placeholder: 'https://github.com/username',
      color: 'text-gray-700'
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      placeholder: 'https://linkedin.com/in/username',
      color: 'text-blue-600'
    },
    {
      key: 'twitter',
      label: 'Twitter',
      icon: Twitter,
      placeholder: 'https://twitter.com/username',
      color: 'text-blue-400'
    },
    {
      key: 'website',
      label: 'Portfolio/Website',
      icon: Globe,
      placeholder: 'https://yourwebsite.com',
      color: 'text-green-600'
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-semibold text-slate-800">
          <Link className="w-5 h-5 mr-2 text-green-600" />
          Social Media & Links
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {socialPlatforms.map(({ key, label, icon: Icon, placeholder, color }) => (
          <div key={key}>
            <Label htmlFor={key} className="text-sm font-medium text-slate-700">
              <Icon className={`w-4 h-4 inline mr-2 ${color}`} />
              {label}
            </Label>
            <Input
              id={key}
              value={socials[key]}
              onChange={(e) => updateSocialData(key, e.target.value)}
              placeholder={placeholder}
              className="mt-1"
              type="url"
            />
          </div>
        ))}
        
        <p className="text-sm text-slate-500 mt-4">
          Add your social media profiles and portfolio links to help teammates learn more about your work.
        </p>
      </CardContent>
    </Card>
  );
};

export default SocialLinksSection;
