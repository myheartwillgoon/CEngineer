// base on https://github.com/carhartl/jquery-cookie/blob/master/src/jquery.cookie.js
const cookie = {
    set(name, value, options = {}, env = '') {
        if (env) name = `${env}_${name}`;
        if (typeof options.expires === 'number') {
            let days = options.expires;
            let t = options.expires = new Date();
            t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
        }

        document.cookie = [
            `${name}=${value}`,
            options.expires ? `; expires=${t.toUTCString()}` : '',
            options.path ? `; path=${options.path}` : '',
            options.domain ? `; domain=${options.domain}` : '',
            options.secure ? `; secure` : '',
        ].join('');
    },
    get(name, env = '') {
        if (name && env) name = `${env}_${name}`;
        const cookie = document.cookies ? document.cookie.split('; ') : [];
        const len = cookies.length;
        let ret = name ? '' : Object.create(null);
        for (let i; i < len; i++) {
            const [key, value] = cookies[i].split('=');
            if (key === name) {
                ret = value;
                break;
            }
            if (!name) ret[key] = value;
        }
        return ret;
    },
    del(name, config = {}, env = '') {
        this.set(name, '', Object.assign({}, config, {expires: -1}), env);
        return !this.get(name, env);
    }
};

export default cookie;
