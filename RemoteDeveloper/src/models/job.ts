export type Job = {
    id: number;
    title: string;
    company: string;
    date: string;
    daysAgo: number;
    relevanceScore: number;
    badgeLetters: string;
}

export type JobProps = {
    job: Job;
}