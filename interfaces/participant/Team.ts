    export interface Team {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  context_id: number;
  pivot: {
    user_id: number;
    team_id: number;
  };
}
