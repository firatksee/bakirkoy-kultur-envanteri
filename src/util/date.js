export function getUnixTime(mode = "ms") {
    const now = Date.now();
    /*  
        get current unix timestamp
        modes: "ms" for miliseconds, "s" for seconds
        default mode is "ms"
        returns -1 for wrong or invalid mode 
    */
    return { ms: now, s: Math.floor(now / 1000) }[mode] || -1;
}
