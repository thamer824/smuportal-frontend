import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "apps",
    loadChildren: () =>
      import("./logistics-reservation/logistics-reservation.module").then(
        m => m.LogisticsReservationModule
      )
  }
  ,
  {
    path: "med", loadChildren: () =>
      import("./medchat/medchat.module").then(
        m => m.medchatmodule
      )
  },

];
@NgModule({
  declarations: [],
  
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsModule {}
