import React, { useState } from 'react';
import { Droplets, Moon, Sun } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { PersonalInfo } from './components/PersonalInfo';
import { ReminderSettings } from './components/ReminderSettings';
import { useHydration } from './hooks/useHydration';
import { useReminders } from './hooks/useReminders';
import { fluids } from './constants/fluids';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const {
    weight,
    setWeight,
    height,
    setHeight,
    activity,
    setActivity,
    waterGoal,
    fluidIntake,
    addFluid,
    resetIntake,
    calculateTotalHydration,
  } = useHydration();

  const {
    settings: reminderSettings,
    setSettings: setReminderSettings,
    nextReminder,
  } = useReminders();

  const totalHydration = calculateTotalHydration();
  const progress = (totalHydration / waterGoal) * 100;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'}`}>
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Droplets className="text-blue-500" />
            HydroTracker Pro
          </h1>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <PersonalInfo
              weight={weight}
              height={height}
              activity={activity}
              onWeightChange={setWeight}
              onHeightChange={setHeight}
              onActivityChange={setActivity}
            />
            
            <div className="mt-6">
              <ReminderSettings
                settings={reminderSettings}
                onSettingsChange={setReminderSettings}
                nextReminder={nextReminder}
              />
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Fluid Intake Tracker</h2>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-200 text-blue-600">
                    Hydration Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                />
              </div>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold">{Math.round(totalHydration)}</span>
                <span className="text-xl"> / {waterGoal} L</span>
              </div>

              {Object.entries(fluids).map(([key, fluid]) => (
                <div key={key} className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <fluid.icon className={`text-${fluid.color}-500`} />
                      <span>{fluid.name}</span>
                    </div>
                    <span>{fluidIntake[key as keyof typeof fluidIntake]}ml</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => addFluid(key as keyof typeof fluidIntake, 100)}
                      className={`bg-${fluid.color}-500 text-white py-1 px-2 rounded hover:bg-${fluid.color}-600 transition-colors text-sm`}
                    >
                      +100ml
                    </button>
                    <button
                      onClick={() => addFluid(key as keyof typeof fluidIntake, 200)}
                      className={`bg-${fluid.color}-500 text-white py-1 px-2 rounded hover:bg-${fluid.color}-600 transition-colors text-sm`}
                    >
                      +200ml
                    </button>
                    <button
                      onClick={() => addFluid(key as keyof typeof fluidIntake, 300)}
                      className={`bg-${fluid.color}-500 text-white py-1 px-2 rounded hover:bg-${fluid.color}-600 transition-colors text-sm`}
                    >
                      +300ml
                    </button>
                  </div>
                  {fluid.warning && (
                    <p className="text-xs text-yellow-500 mt-1">{fluid.warning}</p>
                  )}
                </div>
              ))}

              <button
                onClick={resetIntake}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors mt-4"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
