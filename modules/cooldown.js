let cooldowns = {};

function add(id, sub, time) {
    if (!cooldowns[id])
        cooldowns[id] = {};

    cooldowns[id][sub] = Date.now() + time;
}

function check(id, sub) {
    if (!cooldowns[id] || !cooldowns[id][sub])
        return false;

    let end = cooldowns[id][sub];
    let now = Date.now();

    if (now < end) {
        let remaining = end - now;
        let hours = Math.floor(remaining / (1000 * 60 * 60));
        let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        let timeString = '';
        if (hours > 0) timeString += `${hours} ساعات `;
        if (hours > 0 || minutes > 0) timeString += `${minutes} دقائق `;
        timeString += `${seconds} ثانية`;

        return timeString;
    }

    delete cooldowns[id][sub];
    return false;
}

function list(id) {
    return cooldowns?.[id] ?? {}
}

module.exports = {
    add,
    check,
    list
};
