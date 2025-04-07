export interface FluidIntake {
  water: number;
  coffee: number;
  tea: number;
  alcohol: number;
  milk: number;
}

export interface FluidMultiplier {
  name: string;
  icon: React.ComponentType;
  hydrationMultiplier: number;
  color: string;
  warning?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  condition: (intake: FluidIntake, goal: number) => boolean;
  icon: React.ComponentType;
  unlocked: boolean;
}

export interface ReminderSettings {
  enabled: boolean;
  startTime: string;
  endTime: string;
  interval: number;
  soundEnabled: boolean;
  volume: number;
}