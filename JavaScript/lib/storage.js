function getStorage(isSession) {
    return isSession ? sessionStorage : localStorage;
}
const storage = {
    get(key, isSession = true) {
        const storage = getStorage(isSession);
        let ret = storage.getItem(key);
        const char = ret && ret.slice(0, 1);
        if (char && (char === '{' || char === '[')) {
            ret = JSON.parse(ret);
            if (ret.expires) {
                if (ret.expires >= Date.now()) {
                    if ('value' in ret && Object.keys(ret).length === 2) {
                        ret = ret.value;
                    } else {
                        delete ret.expires;
                    }
                } else {
                    ret = null;
                }
            }
        }
        return ret;
    },
    set(key, value, isSession = true, seconds = 0) {
        const storage = getStorage(isSession);
        let val = value;
        if (seconds) {
            const expires = Date.now() + seconds;
            val = Object.assign({}, typeof value === 'object' ? value : { value }, { expires });
        }
        if (typeof value === 'object') val = JSON.stringify(val);
        storage.setItem(key, val);
    },
    remove(key, isSession = true) {
        const storage = getStorage(isSession);
        storage.removeItem(key);
    },
};
export default storage;
