export type PillRect = {
    left: number;
    top: number;
    width: number;
    height: number;
};

export function getPillTargetRect(containerRect: PillRect, targetRect: PillRect) {
    return {
        x: targetRect.left - containerRect.left,
        y: targetRect.top - containerRect.top,
        width: targetRect.width,
        height: targetRect.height,
    };
}
