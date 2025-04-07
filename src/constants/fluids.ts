import { Droplets, Coffee, Wine, Milk } from 'lucide-react';
import { FluidMultiplier } from '../types';

export const fluids: Record<string, FluidMultiplier> = {
  water: { name: 'Water', icon: Droplets, hydrationMultiplier: 1, color: 'blue' },
  coffee: { 
    name: 'Coffee', 
    icon: Coffee, 
    hydrationMultiplier: 0.8, 
    color: 'amber',
    warning: 'Limit caffeine intake to 400mg per day (about 4 cups of coffee)'
  },
  tea: { 
    name: 'Tea', 
    icon: Coffee, 
    hydrationMultiplier: 0.9, 
    color: 'green',
    warning: 'Green tea contains less caffeine than coffee'
  },
  alcohol: { 
    name: 'Alcohol', 
    icon: Wine, 
    hydrationMultiplier: -0.5, 
    color: 'red',
    warning: 'Alcohol is dehydrating. Drink water to compensate!'
  },
  milk: { 
    name: 'Milk', 
    icon: Milk, 
    hydrationMultiplier: 0.95, 
    color: 'slate',
  },
};