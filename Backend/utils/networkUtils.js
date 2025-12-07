import os from 'os';
/**
 * Gets the current local IPv4 address of the machine.
 * @returns {string | null} The local IPv4 address or null if not found.
 */
function getCurrentIpAddress() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        const networkInterface = networkInterfaces[interfaceName];
        for (const interfaceInfo of networkInterface) {
            if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
                return interfaceInfo.address;
            }
        }
    }
    return null;
}

export { getCurrentIpAddress as getLocalIP };