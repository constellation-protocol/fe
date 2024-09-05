import BigNumber from 'bignumber.js';

export const getScaledAmount = (amount: number, decimals: number): number => {
  let amount_in = Math.round(amount * Math.pow(10, decimals)); 
  return amount_in
};

export const getSwapFeeIncludedAmount = (amount: number) => {
  const feePercent = import.meta.env.VITE_SOROSWAP_FEE as number;
  const fee = amount * ( feePercent/100);
  return amount + fee;
}

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

// 54509999.99999999 
// 54 510 000
export function formatNumber(num: Number, decimals: number): string {
    // Ensure the number is treated as a float and formatted to two decimal places
    const formattedNum = parseFloat(num.toString()).toFixed(decimals);
  
    // Pad the number with zeros if it is less than 10
    return formattedNum.padStart(5, '0');
}


export const formatTokenAmount = (
    amount: BigNumber | string | number,
    decimals: number = 7,
  ): Number => {
    if (!amount) {
      return 0;
    }
  
    if (!(amount instanceof BigNumber)) {
      amount = BigNumber(amount);
    }
  
    let formatted = amount.toString();
  
    if (decimals > 0) {
      formatted = amount.shiftedBy(-decimals).toFixed(decimals).toString();
  
      // Trim trailing zeros
      while (formatted[formatted.length - 1] === '0') {
        formatted = formatted.substring(0, formatted.length - 1);
      }
  
      if (formatted.endsWith('.')) {
        formatted = formatted.substring(0, formatted.length - 1);
      }
    }
  
    return Number(formatted);
  };

  export const toBigNumber = (value: string, decimals: number = 7): BigNumber => {
    return BigNumber(value).shiftedBy(decimals);
  };


