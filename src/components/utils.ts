export const generateUniqueId = function () {
    return Date.now() + Math.floor(Math.random() * 100);
}

export const getColorByLevel = function (level: number): string {
    const colorToLevel = {
        0: '#ffac83',
        1: '#89d3ec',
        2: '#ccf1c6'
    }

    // @ts-ignore
    const colorToLevelElement = colorToLevel[level] || '#f3f3f5';
    return colorToLevelElement;
}