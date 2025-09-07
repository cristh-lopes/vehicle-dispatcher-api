import { Plan } from '@dispatchers/database/entities/plan.entity';

export type UpdatePlansParams = Partial<Plan> & { id: string };

export type UptatePlansResult = Plan;
