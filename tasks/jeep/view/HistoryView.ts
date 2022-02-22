import {History} from "../model/History";
import {Step} from "../model/Step";

export class HistoryView {

    private readonly _div: HTMLDivElement;
    private readonly _ol: HTMLOListElement = document.createElement('ol');
    private _history: History;
    private _current_index: number;
    private _update_listeners: (() => void)[] = [];

    constructor(div: HTMLDivElement, history: History) {
        this._div = div;
        this._div.appendChild(this._ol);
        this.history = history;
        this._current_index = history.size - 1;
        this.update();
    }

    get div(): HTMLDivElement {
        return this._div;
    }

    get history(): History {
        return this._history;
    }

    set history(value: History) {
        this._history = value;
        //TODO remove listeners from the previous history
        this._history.add_listener(() => this.update());
        this.update();
    }

    private update(): void {
        let steps = this._history.steps;
        this.ensure_sub_divs_length(steps.length);

        for (let i = 0; i < steps.length; i++) {
            let step = steps[i];
            let sub_div = this._ol.children[i];
            if (this._current_index == i)
                sub_div.classList.add('selected');
            else
                sub_div.classList.remove('selected');
            let text_span = sub_div.children[0] as HTMLSpanElement;
            let value_span = sub_div.children[1] as HTMLSpanElement;
            text_span.innerText = step.text;
            value_span.innerText = '' + step.value;
        }

        this.fire_update();
    }

    private ensure_sub_divs_length(n: number) {
        let child_nodes = this._ol.childNodes;
        let actual_children_count = child_nodes.length;

        //remove extra
        for (let ind = actual_children_count - 1; ind >= n; ind--)
            this._ol.removeChild(child_nodes[ind]);

        //add if not enough
        for (let ind = actual_children_count; ind < n; ind++) {
            let sub_div = document.createElement('li');
            sub_div.className = 'task-history-item'
            HistoryView.fill_sub_div(sub_div);
            this._ol.appendChild(sub_div);
        }
    }

    private static fill_sub_div(sub_div: HTMLLIElement) {
        let textSpan = document.createElement('span');
        let valueSpan = document.createElement('span');
        let editorDiv = document.createElement('div');
        textSpan.className = 'task-history-text';
        valueSpan.className = 'task-history-value';

        sub_div.append(textSpan, valueSpan, editorDiv);
    }

    get current_step(): Step | null {
        if (this._current_index < 0)
            return null;
        return this.history.step(this._current_index);
    }

    update_current_step(new_step: Step): void {
        this.history.update(this._current_index, new_step);
        this.update();
    }

    insert_next(new_step: Step): void {
        this.history.insert(this._current_index + 1, new_step);
        this._current_index++;
        this.update();
    }

    add_listener(listener: () => void): void {
        this._update_listeners.push(listener);
    }

    fire_update(): void {
        for (const updateListener of this._update_listeners)
            updateListener();
    }

    get current_index(): number {
        return this._current_index;
    }
}
