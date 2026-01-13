export type JobPosting = {
  _id: string;
  title: string;
  industry: string;
  position: string;
  description?: string;
  requirements?: string;
  city?:string,
  country?:string,
  type?:string,
  salary?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
