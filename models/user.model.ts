export interface User {
  firstName: string;
  lastName: string;
  universityID: number;
  email: string;
  password: string;
  token: string;
  twoFactorEnabled: boolean;
  twoFactorType: string;
}
