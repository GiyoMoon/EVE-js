import { ModuleInstance } from './moduleInstance';

export interface Module {
    id: number,
    name: string,
    enabled: boolean,
    instance: ModuleInstance
}