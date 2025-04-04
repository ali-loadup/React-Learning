import { Job } from "./job";

export type JobExpanded = Job & {
  description: string;
  location: string;
  salary: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  coverImgURL: string;
  companyUrl: string;
};
