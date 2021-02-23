import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { routing } from "./app.routing";
import { AppComponent } from "./app.component";

import { Compiler, COMPILER_OPTIONS, CompilerFactory } from "@angular/core";
import { JitCompilerFactory } from "@angular/platform-browser-dynamic";
export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}
import { MatFormFieldModule } from "@angular/material/form-field";
import { AppService } from "./app.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //MatFormFieldModule,
    routing
  ],
  providers: [
    AppService,
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    {
      provide: CompilerFactory,
      useClass: JitCompilerFactory,
      deps: [COMPILER_OPTIONS]
    },
    { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
