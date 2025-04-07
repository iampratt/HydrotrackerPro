import React from 'react';
import { Bell, BellOff, Volume2, VolumeX } from 'lucide-react';
import { ReminderSettings as ReminderSettingsType } from '../types';

interface Props {
  settings: ReminderSettingsType;
  onSettingsChange: (settings: ReminderSettingsType) => void;
  nextReminder: Date | null;
}

export const ReminderSettings: React.FC<Props> = ({
  settings,
  onSettingsChange,
  nextReminder,
}) => {
  const handleChange = (key: keyof ReminderSettingsType, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Reminder Settings</h3>
        <button
          onClick={() => handleChange('enabled', !settings.enabled)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {settings.enabled ? <Bell className="text-blue-500" /> : <BellOff />}
        </button>
      </div>

      {settings.enabled && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Start Time</label>
              <input
                type="time"
                value={settings.startTime}
                onChange={(e) => handleChange('startTime', e.target.value)}
                className="w-full p-2 rounded border bg-transparent"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">End Time</label>
              <input
                type="time"
                value={settings.endTime}
                onChange={(e) => handleChange('endTime', e.target.value)}
                className="w-full p-2 rounded border bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Reminder Interval (minutes)
            </label>
            <input
              type="number"
              min="15"
              max="240"
              step="15"
              value={settings.interval}
              onChange={(e) => handleChange('interval', Number(e.target.value))}
              className="w-full p-2 rounded border bg-transparent"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleChange('soundEnabled', !settings.soundEnabled)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {settings.soundEnabled ? <Volume2 /> : <VolumeX />}
              </button>
              <span className="text-sm">Sound Notifications</span>
            </div>
            {settings.soundEnabled && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.volume}
                onChange={(e) => handleChange('volume', Number(e.target.value))}
                className="w-32"
              />
            )}
          </div>

          {nextReminder && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Next reminder: {nextReminder.toLocaleTimeString()}
            </p>
          )}
        </>
      )}
    </div>
  );
};