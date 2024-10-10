import { Cv } from "./cv";
import { ProjectDetails } from "./project_details";

export interface CvWithProjectDetails {
    cv: Cv;
    projectDetails: ProjectDetails[];
  }