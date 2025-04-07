import { Trophy, Target } from 'lucide-react';
import { Achievement } from '../types';

export const defaultAchievements: Achievement[] = [
  {
    id: 'first-goal',
    title: 'First Goal Achieved!',
    description: 'Reach your daily water intake goal',
    condition: (intake, goal) => calculateTotalHydration(intake) >= goal,
    icon: Trophy,
    unlocked: false
  },
  {
    id: 'perfect-balance',
    title: 'Perfect Balance',
    description: 'Maintain a healthy mix of different beverages',
    condition: (intake) => intake.water >= 1000 && intake.coffee <= 400 && intake.alcohol === 0,
    icon: Target,
    unlocked: false
  }
];