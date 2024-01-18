// dndkit : How do I prevent draggable on input and btns

import { MouseSensor as DndkitMouseSensor, TouchSensor as DndkitTouchSensor } from '@dnd-kit/core';
import { MouseEvent, TouchEvent } from 'react';

// Block DnD event propagation if element have "data-no-dnd" attribute
const handler = ({ nativeEvent: event }: MouseEvent | TouchEvent) => {
    let cur = event.target as HTMLElement;

    while (cur) {
        if (cur.dataset && cur.dataset.noDnd) {
            return false;
        }
        cur = cur.parentElement as HTMLElement;
    }

    return true;
};

export class MouseSensor extends DndkitMouseSensor {
    static activators = [{ eventName: 'onMouseDown', handler }] as typeof DndkitMouseSensor['activators'];
}

export class TouchSensor extends DndkitTouchSensor {
    static activators = [{ eventName: 'onTouchStart', handler }] as typeof DndkitTouchSensor['activators'];
}