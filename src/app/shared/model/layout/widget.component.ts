import ApplianceClass from "../appliance.class";

export default interface WidgetComponent {

    componentUuid: string;
    componentClass: ApplianceClass;
    actuatorUuid: string;
}