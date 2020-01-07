import WidgetComponent from "./widget.component";
import WidgetType from "./widget.type";
import ApplianceClass from "../appliance.class";

export default interface Widget {

    id: string;
    name: string;
    description: string;
    type: WidgetType;
    components: WidgetComponent[];
}