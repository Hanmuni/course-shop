import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

const components = [
    HeaderComponent,
    FooterComponent
];

@NgModule({
  imports: [CommonModule, RouterModule],

  declarations: [...components, ],
  exports: [...components],
})

export class SharedModule {}