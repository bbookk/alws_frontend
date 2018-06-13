import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EngineComponent } from '../component/engine/engine.component';

const ENGINE_ROUTES: Routes = [
  { path: '', component: EngineComponent},
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(ENGINE_ROUTES),
    ReactiveFormsModule
  ],exports: [
    EngineComponent,
    RouterModule,
  ],
  declarations: [
    EngineComponent
  ]
})
export class EngineModule { }
