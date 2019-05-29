import { Component, OnInit } from '@angular/core';
import { CompositionService } from "../../shared/services/composition.service";
import AppComposition from "../../shared/model/composition/app-composition";

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  appComposition: AppComposition;

  constructor(private appCompositionService: CompositionService) {
  }

  ngOnInit() {
    this.appComposition = this.appCompositionService.getApplicationComposition();
  }
}
