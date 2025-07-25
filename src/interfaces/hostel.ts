import { User } from "@/src/interfaces/user";
import { Room } from "@/src/interfaces/room";
import { Position } from "@/src/interfaces/position";

interface Bed {
    bed_number: string;
    reservation_id: string | null;
}

export type HostelStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

export interface Hostel {
  _id?: "";
  status?: HostelStatus;
  stripeAccountId?: string;
  logo?: string;
  username: string;
  name: string;
  street: string;
  city: string;
  country: string;
  zip?: string;
  phone?: string;
  email: string;
  website?: string;
  experience_with_volunteers?: boolean;
  currency: string;
  rooms?: Room[]; 
  owners?: User[]; 
  user_id_guests?: User[]; 
  user_id_staffs?: User[]; 
  events?: Event[]; 
  volunteer_opportunities?: Position[];
  created_at?: Date;
  policies: boolean
}

export interface HostelHome {
  
}