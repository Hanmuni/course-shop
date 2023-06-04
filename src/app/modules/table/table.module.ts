import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table.component';
import { TableRoutingModule } from './table-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule, TableRoutingModule],
  exports: [],
  declarations: [TableComponent],
})
export class TableModule {}
