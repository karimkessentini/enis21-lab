export interface Member {
  id: string,
  cin: string,
  name: string,
  createdDate: string,
  cv: string,
  type: string,
  email: string,
  password: string,
  role?: string
}

export enum Role {
  ADMIN = 'admin',
  MEMBER = 'member'
}
