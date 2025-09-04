export interface Todo {
  id: number;              
  titulo: string;           
  numero: string;          
  descripcion?: string;    
  estado: 'pendiente' | 'en progreso' | 'completado'; 
  fecha_creacion: Date;         
}
