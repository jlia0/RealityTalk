export const dist = (x1, y1, x2, y2) => Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

export const calc_angle = (x1, y1, x2, y2) => {
    let x = Math.abs(x1 - x2)
    let y = Math.abs(y1 - y2)
    let z = Math.sqrt(x * x + y * y)
    let angle = Math.round(Math.asin(y / z) / 3.14 * 180)

    return angle;
}

export const throttle = (fn, ms) => {
    let timerId;
    return function () {
        if (!timerId) {
            timerId = setTimeout(() => {
                timerId = null
                fn.apply(this, arguments)
            }, ms)
        }
    }
}

export const findGroup = (node) => {
    let group = node.findAncestors("Group");
    return group[group.length - 1];
}

export const findLabel = (node) => {
    let label = node.findAncestor("Label");
    return label;
}

export const getRandomNumber = (min, max) => {
    return (Number)((Math.random() * (max - min)) + min);
}

export const readKey = () => {

}

// to detect dynamic gesture like Air Tap using ring/circular buffer...
export const createRingBuffer = function (length) {
    /* https://stackoverflow.com/a/4774081 */
    let pointer = 0, buffer = [];

    return {
        min: function () {
            // or Math.max(...array)
            return buffer.reduce(function (p, v) {
                return (p < v ? p : v);
            });
        },
        max: function () {
            return buffer.reduce(function (p, v) {
                return (p > v ? p : v);
            });
        },
        get: function (key) {
            if (key < 0) {
                return buffer[pointer + key];
            } else if (key === false) {
                return buffer[pointer - 1];
            } else {
                return buffer[key];
            }
        },
        push: function (item) {
            buffer[pointer] = item;
            pointer = (pointer + 1) % length;
            return item;
        },
        prev: function () {
            let tmp_pointer = (pointer - 1) % length;
            if (buffer[tmp_pointer]) {
                pointer = tmp_pointer;
                return buffer[pointer];
            }
        },
        next: function () {
            if (buffer[pointer]) {
                pointer = (pointer + 1) % length;
                return buffer[pointer];
            }
        }
    };
};