import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { Transform } from '@dnd-kit/utilities';

export interface Sortable {
    attributes: DraggableAttributes;
    listeners: SyntheticListenerMap | undefined;
    setNodeRef: (node: HTMLElement | null) => void;
    transform: Transform | null;
    transition: string | undefined;
    isDragging: boolean
}