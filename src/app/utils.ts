export const generateUniqueId = function () {
    return Date.now() + Math.floor(Math.random() * 100);
}

export interface LevelColors {
    background: string,
    color: string
}

export const getColorByLevel = function (level: number): LevelColors {
    const colorToLevel = {
        0: {background: '#ffac83', color: '#ffffff'},
        1: {background: '#89d3ec', color: '#fff'},
        2: {background: '#ccf1c6', color: '#fff'}
    }

    // @ts-ignore
    const colorToLevelElement = colorToLevel[level] || {background: '#f3f3f5', color: '#000' };
    return colorToLevelElement;
}

export const iconSize: string = '1.2em';