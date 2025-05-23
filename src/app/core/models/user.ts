export interface User {
  id: string;
  email: string;
  idUsuCatEstadoFK:  number;
  idUsuCatTipoUsuario: number;
  strPassword?: string;
  } 