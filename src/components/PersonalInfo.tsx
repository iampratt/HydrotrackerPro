import React from 'react';
import { Weight, Weight as Height, Activity } from 'lucide-react';

interface Props {
  weight: number;
  height: number;
  activity: string;
  onWeightChange: (weight: number) => void;
  onHeightChange: (height: number) => void;
  onActivityChange: (activity: string) => void;
}

export const PersonalInfo: React.FC<Props> = ({
  weight,
  height,
  activity,
  onWeightChange,
  onHeightChange,
  onActivityChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="flex items-center gap-2 mb-2">
          <Weight size={20} />
          Weight (kg)
        </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => onWeightChange(Number(e.target.value))}
          className="w-full p-2 rounded border bg-transparent"
        />
      </div>
      <div>
        <label className="flex items-center gap-2 mb-2">
          <Height size={20} />
          Height (cm)
        </label>
        <input
          type="number"
          value={height}
          onChange={(e) => onHeightChange(Number(e.target.value))}
          className="w-full p-2 rounded border bg-transparent"
        />
      </div>
      <div>
        <label className="flex items-center gap-2 mb-2">
          <Activity size={20} />
          Activity Level
        </label>
        <select
          value={activity}
          onChange={(e) => onActivityChange(e.target.value)}
          className="w-full p-2 rounded border bg-transparent"
        >
          <option value="sedentary">Sedentary</option>
          <option value="light">Light Activity</option>
          <option value="moderate">Moderate Activity</option>
          <option value="active">Very Active</option>
        </select>
      </div>
    </div>
  );
};