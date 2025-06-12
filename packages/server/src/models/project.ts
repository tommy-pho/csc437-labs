export interface Project {
  projectTitle: string;
  projectLink: string;
  imgSrc?: string;
  description: string;
  skills?: string[];
  artifacts?: { label: string; url: string }[];
}