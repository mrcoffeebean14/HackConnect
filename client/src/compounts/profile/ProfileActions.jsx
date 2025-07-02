
import React from 'react';
import { Button } from '../ui/button';
import { Save, RotateCcw } from 'lucide-react';

const ProfileActions = ({ hasChanges, saving, onSave, onCancel }) => {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex gap-4">
        <Button
          onClick={onCancel}
          variant="outline"
          disabled={!hasChanges || saving}
          className="px-6"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Cancel Changes
        </Button>
        
        <Button
          onClick={onSave}
          disabled={!hasChanges || saving}
          className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProfileActions;
