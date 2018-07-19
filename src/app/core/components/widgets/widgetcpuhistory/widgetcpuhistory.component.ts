import { Component, AfterViewInit, Input, ViewChild, OnDestroy} from '@angular/core';
import { CoreServiceInjector } from '../../../services/coreserviceinjector';
import { CoreService, CoreEvent } from '../../../services/core.service';
import { MaterialModule } from '../../../../appMaterial.module';
import { NgForm } from '@angular/forms';
import { ChartData } from '../../viewchart/viewchart.component';
import { ViewChartDonutComponent } from '../../viewchartdonut/viewchartdonut.component';
import { ViewChartPieComponent } from '../../viewchartpie/viewchartpie.component';
import { ViewChartLineComponent } from '../../viewchartline/viewchartline.component';
import { AnimationDirective } from '../../../directives/animation.directive';
import filesize from 'filesize';
import { WidgetComponent } from '../widget/widget.component';
import { TranslateService } from '@ngx-translate/core';

import { T } from '../../../../translate-marker';

@Component({
  selector: 'widget-cpu-history',
  templateUrl:'./widgetcpuhistory.component.html'
})
export class WidgetCpuHistoryComponent extends WidgetComponent implements AfterViewInit, OnDestroy {

  @ViewChild('chartCpu') chartCpu: ViewChartLineComponent;
  public title:string = T("CPU History");

  constructor(public translate: TranslateService){
    super(translate);
  }

  ngOnDestroy(){
    this.core.emit({name:"StatsRemoveListener", data:{name:"CpuAggregate", obj:this}});
  }

  ngAfterViewInit(){
    this.core.emit({name:"StatsAddListener", data:{name:"CpuAggregate",key:"sum", obj:this} });
    this.core.register({observerClass:this,eventName:"StatsCpuData"}).subscribe((evt:CoreEvent) => {
      //DEBUG: console.log(evt);
      //this.setCPUData(evt);
    });

    this.core.register({observerClass:this,eventName:"StatsCpuAggregateSum"}).subscribe((evt:CoreEvent) => {
      this.setCPUData(evt);
    });

    this.core.register({observerClass:this, eventName:"ThemeChanged"}).subscribe(() => {
      this.chartCpu.refresh();
    });

    //this.core.emit({name:"StatsCpuRequest", data:[['user','interrupt','system'/*,'idle','nice'*/],{step:'10', start:'now-10m'}]});
  }

  setCPUData(evt:CoreEvent){
    //DEBUG: console.log("SET CPU DATA");
    //DEBUG: console.log(evt.data);
    let cpuUserObj = evt.data;

    let parsedData = [];
    let dataTypes = [];
    dataTypes = evt.data.meta.legend;

    for(let index in dataTypes){
      let chartData:ChartData = {
        legend: dataTypes[index],
        data:[]
      }
      for(let i in evt.data.data){
        chartData.data.push(evt.data.data[i][index])
      }
      parsedData.push(chartData);
    }

     this.chartCpu.chartType = 'area-spline';
     this.chartCpu.units = '%';
     this.chartCpu.timeSeries = true;
     this.chartCpu.timeFormat = '%H:%M';// eg. %m-%d-%Y %H:%M:%S.%L
     this.chartCpu.timeData = evt.data.meta;
     this.chartCpu.data = parsedData;//[cpuUser];
     this.chartCpu.width = this.chartSize;
     this.chartCpu.height = this.chartSize;
     this.chartCpu.refresh();
  }

  setPreferences(form:NgForm){
    let filtered: string[] = [];
    for(let i in form.value){
      if(form.value[i]){
        filtered.push(i);
      }
    }
  }

}
