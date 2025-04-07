import { useState, useEffect } from 'react';
import { ReminderSettings } from '../types';
import toast from 'react-hot-toast';

const DEFAULT_SETTINGS: ReminderSettings = {
  enabled: false,
  startTime: '08:00',
  endTime: '22:00',
  interval: 60, // minutes
  soundEnabled: true,
  volume: 0.8,
};

export const useReminders = () => {
  const [settings, setSettings] = useState<ReminderSettings>(DEFAULT_SETTINGS);
  const [nextReminder, setNextReminder] = useState<Date | null>(null);

  const isWithinActiveHours = () => {
    const now = new Date();
    const [startHour, startMinute] = settings.startTime.split(':').map(Number);
    const [endHour, endMinute] = settings.endTime.split(':').map(Number);
    
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;
    
    return currentTime >= startTime && currentTime <= endTime;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (settings.enabled) {
      interval = setInterval(() => {
        if (isWithinActiveHours()) {
          toast('Time to hydrate! 💧', {
            icon: '⏰',
            duration: 5000
          });
          
          if (settings.soundEnabled) {
            // Play notification sound
            const audio = new Audio('/notification.mp3');
            audio.volume = settings.volume;
            audio.play().catch(() => {});
          }
        }
      }, settings.interval * 60 * 1000);

      // Calculate next reminder time
      const now = new Date();
      const next = new Date(now.getTime() + settings.interval * 60 * 1000);
      setNextReminder(next);
    }

    return () => clearInterval(interval);
  }, [settings]);

  return {
    settings,
    setSettings,
    nextReminder,
    DEFAULT_SETTINGS,
  };
};