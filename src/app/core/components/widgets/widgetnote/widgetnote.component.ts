import { Component, OnInit, AfterViewInit, Input, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { CoreServiceInjector } from '../../../services/coreserviceinjector';
import { Router } from '@angular/router';
//import { CoreService, CoreEvent } from 'app/core/services/core.service';
import { MaterialModule } from '../../../../appMaterial.module';
import { AnimationDirective } from '../../../directives/animation.directive';
import { WidgetComponent } from '../widget/widget.component';
import { TranslateService } from '@ngx-translate/core';

import { T } from '../../../../translate-marker';

@Component({
  selector: 'widget-note',
  templateUrl:'./widgetnote.component.html',
  styleUrls: ['./widgetnote.component.css']
})
export class WidgetNoteComponent extends WidgetComponent implements OnInit, AfterViewInit {

  @Input() noteData:any = "";
  public title = T("Note");
  public flipDirection = "horizontal";

  constructor(public router: Router, public translate: TranslateService){
    super(translate);
    this.configurable = true;
  }

  ngOnInit(){
  }
  
  ngAfterViewInit(){
    //console.log(this.el.nativeElement.children);
  }

}
