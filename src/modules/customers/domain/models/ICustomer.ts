// Caso você queira colocar alguma propriedade como opcional coloque a interrogação na propriedade: name?: string;
export interface ICustomer {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}
