export interface FavoritesRepository {
  load(): Promise<number[]>;
  save(ids: number[]): Promise<void>;
}
