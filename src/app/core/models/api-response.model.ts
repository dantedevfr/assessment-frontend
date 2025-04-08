export interface ApiListResponse<T> {
  data: T[]; // <--- Esto es lo que se espera en la práctica
  total: number;
}
