import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
  getCursos() {
    return ["teste1", "teste2", "teste3"];
  }
}
