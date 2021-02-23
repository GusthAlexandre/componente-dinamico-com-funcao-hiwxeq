import {
  Component,
  ViewChild,
  AfterContentInit,
  Compiler,
  ViewContainerRef,
  NgModule
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";

import { AppService } from "./app.service";

import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: "app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterContentInit {
  @ViewChild("teste", { read: ViewContainerRef }) _container: ViewContainerRef;

  cursos: string[] = [];
  private cmpRef;
  formAutenticacao: FormGroup;
  public teste: string = `
        <h2>This is a dynamic component</h2>
        <button (click)="_parent.testeFunction()">Click me!</button>
        <p class="login-alert">H2 and interpolaton: 2+2={{2+2}}</p>

        <form fxLayout="column" [formGroup]="_parent.formAutenticacao">
            <div *ngIf="_parent.testandoVar">
              <span>{{_parent.testandoVar}}</span>
              <p>testeeee222</p>
            </div>
            <input [className]="_parent.mudarClassLogin" matInput autofocus formControlName="j_username">
            <div *ngIf="_parent.testandoVar2">
              <span>{{_parent.testandoVar2}}</span>
              <p>aaaaaaaaa</p>
            </div>
            <button type="submit" (click)="_parent.onSubmit()">Submit</button>
        </form>
        <h5>Lista Teste</h5>
        <ul>
          <li *ngFor="let curso of _parent.cursos">
            {{curso}}
          </li>
        </ul>
      `;

  constructor(
    private compiler: Compiler,
    private formBuilder: FormBuilder,
    private appService: AppService
  ) {}

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }

  ngAfterContentInit() {
    this.formAutenticacao = this.formBuilder.group({
      j_username: ["", Validators.required],
      j_password: ["", Validators.required]
    });
    this.cursos = this.appService.getCursos();
    this.addComponent();
  }

  get mudarClassLogin() {
    if (this.f.j_username.touched) {
      return this.f.j_username.valid
        ? "color-login"
        : this.f.j_username.invalid
        ? "color-login-invalid"
        : "color-login";
    } else {
      return "color-login";
    }
  }

  testandoVar: string = "testeeeee";

  testandoVar2: string = null;

  testeFunction(): void {
    //alert("testeFuncao!");
    console.log("123:testeFuncao");
    console.log(this.f.j_username.value);
  }

  get f() {
    return this.formAutenticacao.controls;
  }

  onSubmit() {
    //alert("SUBMIT FUNCIONADO");
    console.log("submit funcionando");
    console.log(this.f.j_username.value);
  }

  private addComponent(): void {
    @Component({
      template: this.teste,
      styleUrls: ["./dynamic.component.css"]
    })
    class DynamicComponent {
      constructor(public _parent: AppComponent) {}
    }
    @NgModule({
      imports: [ReactiveFormsModule, BrowserModule], //azcAngularMaterialModule
      declarations: [DynamicComponent]
    })
    class DynamicModule {}

    const mod = this.compiler.compileModuleAndAllComponentsSync(DynamicModule);
    const factory = mod.componentFactories.find(
      comp => comp.componentType === DynamicComponent
    );

    this.cmpRef = this._container.createComponent(factory);
  }
}
