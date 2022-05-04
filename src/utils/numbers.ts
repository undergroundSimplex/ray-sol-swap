import { Fraction } from '@raydium-io/raydium-sdk'
import { BN } from 'bn.js'

export const toFraction = (val: BN, decimal: number): Fraction => {
    console.log(val.toString(), decimal)
    return new Fraction(val, 10 ** decimal)
}
