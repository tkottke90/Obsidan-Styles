import { readFileSync } from 'fs';
import { resolve } from 'path';
import Sinon from 'sinon';
import { ModuleKind, ModuleResolutionKind, transpileModule } from 'typescript';
import vm from 'vm';
import { dv } from '../../ts-src/types/dataview';

interface DataviewContext extends Record<string, any> {
  input: Record<string, any>
  dv: dv
}

export function createMockDataView() {
  return {
    el: Sinon.mock('el'),
    paragraph: Sinon.mock('paragraph'),
    query: Sinon.mock('query'),
    table: Sinon.mock('table'),
    view: Sinon.mock('view'),
  }
}

export function executeDataview(filename: string, context: DataviewContext) {
  const file = resolve(filename);
  const fileData = readFileSync(file, 'utf-8');

  const ctx = vm.createContext(context);

  const transpiledCode = transpileModule(fileData, {
    compilerOptions: {
      moduleResolution: ModuleResolutionKind.NodeNext,
      module: ModuleKind.CommonJS
    }
  });

  vm.runInContext(transpiledCode.outputText, ctx);
}