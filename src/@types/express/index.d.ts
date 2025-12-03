// Aqui nós fizemos uma sobrescrita do type Request do express, ou melhor, adicionamos um novo objeto com o tipo string
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
