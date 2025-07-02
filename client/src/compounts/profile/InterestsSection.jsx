
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Heart } from 'lucide-react';

const InterestsSection = ({ interests, updateInterests }) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-semibold text-slate-800">
          <Heart className="w-5 h-5 mr-2 text-purple-600" />
          Interests & Passions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={interests}
          onChange={(e) => updateInterests(e.target.value)}
          placeholder="What topics, technologies, or causes are you passionate about? (e.g., AI, sustainability, gaming, fintech, healthcare...)"
          rows={3}
          className="resize-none"
        />
        <p className="text-sm text-slate-500 mt-2">
          Share your interests to help others understand what motivates you and find teammates with similar passions.
        </p>
      </CardContent>
    </Card>
  );
};

export default InterestsSection;
