import PanelLayout from "./panel.layout";

export default interface Schema {

    schema_id: number;
    schema_uuid: string;
    owner: string;
    type: string;
    payload: PanelLayout;
}