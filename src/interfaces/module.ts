import { ModuleInstance } from './moduleInstance';

export interface Module {
    id: string,
    name: string,
    enabled: boolean,
    instance: ModuleInstance
}