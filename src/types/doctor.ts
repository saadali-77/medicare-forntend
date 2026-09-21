export interface ApiDoctor {
  id: number;
  user?: {
    name?: string;
    email?: string;
    phone?: string | null;
    isActive?: boolean;
  };
  specialization?: string | null;
  qualification?: string | null;
  experience?: number | null;
  licenseNumber?: string | null;
  bio?: string | null;
  isAvailable?: boolean;
  departmentId?: number | null;
  department?: { id?: number; name?: string } | null;
  imageUrl?: string | null;
}
