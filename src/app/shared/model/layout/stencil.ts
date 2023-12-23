import PanelLayout from "./panel.layout";

export default interface Stencil {

    stencil_id: number;
    stencil_uuid: string;
    owner: string;
    type: string;
    payload: PanelLayout;
}