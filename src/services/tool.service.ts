import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GLOBAL} from "../app/app-config";
import {Utils} from "../utils/utils";
import {Tool} from "../models/tool.model";

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  public placeholderTools: Tool[] = GLOBAL._DB.tools;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllTools(): Promise<Tool[]> {
    // return this.httpClient.get<Tool[]>('linkToRestApi').toPromise();
    return new Promise(resolve => resolve(this.placeholderTools));
  }

  getToolById(id: string): Promise<Tool> {
    // return this.httpClient.get<Tool>('linkToRestApi').toPromise();
    return new Promise(resolve => resolve(
      this.placeholderTools.filter(item => item.id === id)[0] ?? null
    ));
  }

  /**
   * create a new tool or update an old tool.
   * a new tool doesn't have an id
   */
  saveTool(tool: any): Promise<Tool> {
    // return this.httpClient.post<Tool>('linkToRestApi', member).toPromise();
    const toolToSave = {
      id: tool.id ?? Utils.fakeNumber().toString(),
      Date: tool.Date ?? new Date().toISOString(), ...tool
    };
    this.placeholderTools = [toolToSave, ...this.placeholderTools.filter(item => item.id !== tool.id)];

    return new Promise(resolve => resolve(toolToSave));
  }

  removeToolById(id: string): Promise<void> {
    // return this.httpClient.delete<void>('linkToRestApi').toPromise();
    this.placeholderTools = this.placeholderTools.filter(item => item.id !== id);
    return new Promise(resolve => resolve());
  }

}
