

export const formatAddress = (address: string) => {
    const regex = /^(.{4}).*(.{4})$/;
    const match = address.match(regex);
    if (match) {
        return `${match[1]}...${match[2]}`;
    }
    return address;
};

export const formatAddressLong = (address: string) => {
    const regex = /^(.{20}).*(.{6})$/;
    const match = address.match(regex);
    if (match) {
        return `${match[1]}...${match[2]}`;
    }
    return address;
};



