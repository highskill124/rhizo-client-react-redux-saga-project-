export interface ICourseItem {
    status: 'pending' | 'approved' | 'hold' | 'completed';
    title: string;
    profileName: string;
    profileType: string;
    message: string;
    meetingLocation: string;
    meetingDate: string;
    meetingTime: string;
    meetingDuration: string;
}
