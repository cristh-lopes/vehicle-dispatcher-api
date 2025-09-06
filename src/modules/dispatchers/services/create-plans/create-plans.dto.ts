import { Plan } from '@dispatchers/database/entities/plan.entity';

export type CreatePlansParams = {
  name: string;
  price: number;
  maxUsers?: number;
  features?: string[];
};

export type CreatePlansResult = Plan;
