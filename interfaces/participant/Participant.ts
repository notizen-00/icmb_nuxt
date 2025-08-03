import type { ConferenceType } from './ConferenceType';

export interface ParticipantPayment {
  id: number;
  team_id: number;
  user_id: number;
  transaction_code: string;
  snap_token: string | null;
  note: string | null;
  payment_type: 'manual' | 'online' | string;
  amount: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  participant_id: number;
  status: number | 'pending' | 'success' | 'failed';
  payment_file: string | null;
}

export interface Participant {
  id: number;
  team_id: number;
  conference_type_id: number;
  manuscript_title: string;
  corresponding_email: string;
  corresponding_author: string;
  affiliation: string;
  no_hp: string;
  manuscript_file: string;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  conference_type: ConferenceType;
  participant_payment: ParticipantPayment;
}


