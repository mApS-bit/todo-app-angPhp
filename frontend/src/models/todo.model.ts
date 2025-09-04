export interface Todo {
  id: number;              
  title: string;           
  numero: string;          
  descripcion?: string;    
  estado: 'pendiente' | 'en progreso' | 'completado'; 
  createdAt: Date;         
}
