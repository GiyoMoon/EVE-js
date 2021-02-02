import { Message } from "discord.js";

export interface ModuleInstance {
    info: {
        id: number,
        name: string,
        cmds: { prefixes: string[], cmdDescription: string, methodName: string, admin: boolean }[]
        moduleDescription: string
    }
}