import {KioParameterDescription, KioTaskParameters, KioTaskSettings} from "../KioApi";

export class Jeep implements KioTaskParameters {

    constructor(settings: KioTaskSettings) {
    }

    parameters(): KioParameterDescription[] {
        if (!(this as any).message)
            (this as any).message = (s:string) => s;
        let message = (this as any).message;

        return [
            {
                name: "far_with_return",
                title: message("Дальность с возвращением"),
                ordering: 'maximize'
            },
            {
                name: "far",
                title: message("Дальность"),
                ordering: 'maximize'
            },
            {
                name: "total_fuel",
                title: message("Использовано топлива"),
                ordering: 'minimize'
            },
            {
                name: "steps",
                title: message("Количество команд"),
                ordering: 'minimize'
            }
        ];
    }
}
