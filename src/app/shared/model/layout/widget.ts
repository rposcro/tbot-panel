import WidgetComponent from "./widget.component";
import WidgetType from "./widget.type";

export default interface Widget {

    uuid: string;
    name: string;
    description: string;
    type: WidgetType;
    components: WidgetComponent[];
}