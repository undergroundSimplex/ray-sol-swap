import { Fraction } from '@raydium-io/raydium-sdk'
import { useState } from 'react'
import { usePhantom } from '../hooks/usePhantom'
import { quoteAmountOut } from '../utils/swap'

export const LiquidityModal = ({ token1Amount, token2Amount }: { token1Amount: Fraction; token2Amount: Fraction }) => {
    const { connected } = usePhantom()
    const [inputAmount, setInputAmount] = useState<number>(0)

    return (
        <>
            <div style={{ border: '1px solid coral', padding: 20 }}>
                <div>
                    Input RAY Amount{' '}
                    <input
                        type="number"
                        onChange={(e) => {
                            setInputAmount(Number(e.target.value))
                        }}
                    ></input>
                </div>
                <p>{`Expected SOL amount: ${quoteAmountOut(new Fraction(inputAmount), token1Amount, token2Amount).toFixed(2)}`}</p>
                <button
                    disabled={!connected}
                    onClick={() => {
                        // Trade.makeTradeTransaction()
                    }}
                >
                    swap
                </button>
            </div>

            <p>{`pool RAY amount: ${token1Amount.toFixed(4)}`}</p>
            <p>{`pool SOL amount: ${token2Amount.toFixed(4)}`}</p>
        </>
    )
}
