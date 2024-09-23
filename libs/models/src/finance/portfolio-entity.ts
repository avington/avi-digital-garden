import { PositionEntity } from './position-entity';

export interface PortfolioEntity {
  id?: string;
  name: string;
  user: string;
  description?: string;
  positions?: PositionEntity[];
  created: Date;
  updated?: Date;
}
