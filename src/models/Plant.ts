export default interface Plant {
  id: number;
  nickname: string;
  species?: string;
  health?: string; // maybe special type/enum later
  needsWater?: boolean;
  lastWatered?: number;
  wateringFrequency?: string; // maybe special type/enum later
}

export interface PlantResponse {
  plant: Plant;
}
