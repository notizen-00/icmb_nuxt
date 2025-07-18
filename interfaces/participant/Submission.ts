export enum SubmissionStatus {
    REVIEW = 'review',
    COPYEDITING = 'copyediting',
    PRODUCTION = 'production',
    INCOMPLETE = 'incomplete',
    SUBMISSION = 'submission'
}

export interface Submission {
    team_id: number
    user_id: number
    submission_ojs_id: number
    admin_id: number
    status: SubmissionStatus
    publication_ojs_id: number
    publication_file_ojs_id: number
    participant_id: number,
    abstract:any,
    commentsForTheEditors:any
}
