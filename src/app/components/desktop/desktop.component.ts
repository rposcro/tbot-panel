import {Component, OnInit} from '@angular/core';
import PanelLayout from '../../shared/model/layout/panel.layout';
import {LayoutService} from '../../shared/services/layout.service';

@Component({
    selector: 'desktop',
    standalone: false,
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

    panelLayout: PanelLayout;

    constructor(private layoutService: LayoutService) {
    }

    ngOnInit() {
        this.panelLayout = this.layoutService.getPanelLayoutDefinition();
    }
}
