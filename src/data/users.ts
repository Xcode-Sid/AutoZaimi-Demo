export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  role: 'admin' | 'user';
  avatar: string;
  savedVehicles: number[];
}

export const users: User[] = [
  {
    id: 'admin-1',
    firstName: 'Admin',
    lastName: 'AutoZaimi',
    email: 'admin@autozaimi.al',
    password: 'admin123',
    phone: '+355 44 123 456',
    address: 'Rruga Durrësit 100',
    city: 'Tiranë',
    role: 'admin',
    avatar: 'AA',
    savedVehicles: [],
  },
  {
    id: 'user-1',
    firstName: 'Artan',
    lastName: 'Hoxha',
    email: 'user@autozaimi.al',
    password: 'user123',
    phone: '+355 69 123 4567',
    address: 'Rruga Myslym Shyri',
    city: 'Tiranë',
    role: 'user',
    avatar: 'AH',
    savedVehicles: [1, 3, 8],
  },
];
