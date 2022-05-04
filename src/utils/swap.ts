import { Fraction } from '@raydium-io/raydium-sdk'

// A simple method to return swap quote amount
// This is a very rough function and we should add things like fee, slippage etc.
export const quoteAmountOut = (inAmount: Fraction, token1Amount: Fraction, token2Amount: Fraction): Fraction => {
    if (token1Amount.add(inAmount).toFixed(0) === '0') return new Fraction(0)
    // x * y = (x + inAmount) * (y - result)
    return token2Amount.sub(token1Amount.mul(token2Amount).div(token1Amount.add(inAmount)))
}
