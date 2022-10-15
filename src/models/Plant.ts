export default interface Plant {
  nickname: string;
  species: string;
  health?: string; // maybe special type/enum later
  needsWater?: boolean;
}
