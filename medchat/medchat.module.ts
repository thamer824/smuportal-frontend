import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { QlevelComponent } from './qlevel/qlevel.component';
import { MainPaigeComponent } from './main-paige/main-paige.component';


const routes: Routes = [
  {
    path: "qlevel",
    component: QlevelComponent
  },
  {
    path: "",
    component: MainPaigeComponent
  }
];

@NgModule({
  
  declarations: [QlevelComponent,MainPaigeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class medchatmodule { }