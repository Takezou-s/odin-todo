import { ChangeNotifierProperty } from "../Utility/EventManagement/ChangeNotifierProperty";
import { PropertyChangedEvent } from "../Utility/EventManagement/PropertyChangedEvent";

export class Note {
  constructor(public id: any, public title: string, public description: string, public todoId: any) {}
}
