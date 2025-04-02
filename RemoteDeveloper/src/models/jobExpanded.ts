export type JobExpanded = {
    id: number;
    title: string;
    company: string;
    date: string;
    daysAgo: number;
    relevanceScore: number;
    badgeLetters: string;
    description: string;
    location: string;
    salary: string;
    qualifications: string[];reviews: string[];
    duration: string;
    coverImgURL: string;
    companyUrl: string;
}