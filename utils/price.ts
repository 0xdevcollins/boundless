export async function getXLMPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd');
    const data = await response.json();
    return data.stellar.usd;
  } catch (error) {
    console.error('Failed to fetch XLM price:', error);
    throw new Error('Failed to fetch XLM price');
  }
}

export function convertUSDToStroops(usdAmount: number, xlmPrice: number): bigint {
  const xlmAmount = usdAmount / xlmPrice;
  return BigInt(Math.floor(xlmAmount * 10_000_000));
}
