import { ChangeNotifierProperty } from "../Utility/EventManagement/ChangeNotifierProperty";
import { PropertyChangedEvent } from "../Utility/EventManagement/PropertyChangedEvent";

export class Note {
  propertyChangedEvent: PropertyChangedEvent = new PropertyChangedEvent(50);

  id: ChangeNotifierProperty = new ChangeNotifierProperty(this, "id", this.propertyChangedEvent);
  title: ChangeNotifierProperty = new ChangeNotifierProperty(this, "title", this.propertyChangedEvent);
  description: ChangeNotifierProperty = new ChangeNotifierProperty(this, "description", this.propertyChangedEvent);
  todoId: ChangeNotifierProperty = new ChangeNotifierProperty(this, "todoId", this.propertyChangedEvent);
  constructor(id: any, title: string, description: string, todoId: any) {
    this.id.setValueSilent(id);
    this.title.setValueSilent(title);
    this.description.setValueSilent(description);
    this.todoId.setValueSilent(todoId);
  }
}
