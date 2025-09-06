import { Plan } from '@dispatchers/database/entities/plan.entity';

export type GetPlansResult = Promise<Plan[]>;

export type GetOnePlanResult = Promise<Plan>;
