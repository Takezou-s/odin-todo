import { ProjectType } from "./ProjectType";

export class TodoProject {
  constructor(
    public id: any,
    public title: string,
    public description: string,
    public todoCount: number,
    public projectType: ProjectType
  ) {}
}
