export class Stool {

    constructor(settings) {
    }

    parameters = function () {
        return [
            {
                name: "distance", //название параметра
                title: "Surface distance", //отображение названия для пользователя
                ordering: 'minimize', // 'maximize' - надо как можно больше, 'minimize' - как можно меньше
                view: ""
            },
            {
                name: "tiltAngle",
                title: "Inclination",
                ordering: 'minimize',
                view: "°"
            }
        ];
    };
}

