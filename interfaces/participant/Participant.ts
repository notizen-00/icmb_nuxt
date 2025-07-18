import type { ConferenceType } from './ConferenceType';

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
}
