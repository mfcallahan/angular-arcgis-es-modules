import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  declarations: [AppComponent, MapComponent, HeaderComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, FlexLayoutModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
