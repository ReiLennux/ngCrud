export interface User {
  id: string;
  strName: string;
  idUsuCatEstadoFK:  number;
  idUsuCatTipoUsuario: number;
  strPassword?: string;
  } 