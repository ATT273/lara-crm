export interface IAccountResponse {
  id: number;
  name: string;
  email: string;
  roleCode: string;
  active: 1 | 0;
  created_at: string;
  updated_at: string;
}
