import { useState, useEffect } from 'react';
import { FluidIntake } from '../types';
import { fluids } from '../constants/fluids';
import toast from 'react-hot-toast';

export const useHydration = () => {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [activity, setActivity] = useState<string>('moderate');
  const [waterGoal, setWaterGoal] = useState<number>(0);
  const [fluidIntake, setFluidIntake] = useState<FluidIntake>({
    water: 0,
    coffee: 0,
    tea: 0,
    alcohol: 0,
    milk: 0,
  });

  useEffect(() => {
    const baseIntake = weight * 0.033;
    const activityMultiplier = {
      sedentary: 1,
      light: 1.2,
      moderate: 1.4,
      active: 1.6,
    }[activity];
    
    const recommendedIntake = Math.round(baseIntake * activityMultiplier);
    setWaterGoal(recommendedIntake);
  }, [weight, height, activity]);

  const addFluid = (type: keyof FluidIntake, amount: number) => {
    setFluidIntake(prev => ({
      ...prev,
      [type]: prev[type] + amount
    }));

    if (type === 'water') {
      const messages = [
        '💧 Great job staying hydrated!',
        '💪 Your body thanks you!',
        '🌊 Keep up the good work!',
        '✨ Hydration hero!'
      ];
      toast.success(messages[Math.floor(Math.random() * messages.length)]);
    }
  };

  const resetIntake = () => {
    setFluidIntake({
      water: 0,
      coffee: 0,
      tea: 0,
      alcohol: 0,
      milk: 0,
    });
    toast('Daily intake reset! Start fresh! 🌅');
  };

  const calculateTotalHydration = (intake: FluidIntake = fluidIntake) => {
    return Object.entries(intake).reduce((total, [type, amount]) => {
      return total + (amount * fluids[type].hydrationMultiplier);
    }, 0);
  };

  return {
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
  };
};