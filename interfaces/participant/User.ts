import type { Participant } from './Participant';
import type { Submission } from './Submission';
import type { Team } from './Team';

export interface UserParticipant {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  is_admin: number;
  created_at: string;
  updated_at: string;
  access: string;
  participant: Participant[];
  submission: Submission;
  participant_payment: any[]; // Update if needed
  team: Team[];
}
