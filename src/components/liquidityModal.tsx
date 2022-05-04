import { Fraction, jsonInfo2PoolKeys, RouteInfo, Trade } from '@raydium-io/raydium-sdk'
import { useCallback, useState } from 'react'
import { useBalance } from '../hooks/useBalance'
import { useConnection } from '../hooks/useConnection'
import { usePhantom } from '../hooks/usePhantom'
import { RaySolPool } from '../hooks/usePool'
import { quoteAmountOut } from '../utils/swap'

export const LiquidityModal = ({ token1Amount, token2Amount }: { token1Amount: Fraction; token2Amount: Fraction }) => {
    const { connected, pubKey } = usePhantom()
    const { connection } = useConnection()
    const [inputAmount, setInputAmount] = useState<number>(0)

    const { balances, solBalance } = useBalance(connection, pubKey, [RaySolPool.baseMint])

    const swap = useCallback(() => {
        const routeInfo: RouteInfo = { source: 'amm', keys: jsonInfo2PoolKeys(RaySolPool) }
        // const { setupTransaction, tradeTransaction } = await Trade.makeTradeTransaction({
        //     connection,
        //     routes: [routeInfo],
        //     routeType: "amm",
        //     fixedSide: 'in',
        //     userKeys: { tokenAccounts: tokenAccountRawInfos, owner },
        //     amountIn: deUITokenAmount(upCoinTokenAmount), // TODO: currently  only fixed upper side
        //     amountOut: deUITokenAmount(toTokenAmount(downCoin, minReceived, { alreadyDecimaled: true }))
        //   })
    }, [])

    return (
        <>
            <div style={{ border: '1px solid coral', padding: 20 }}>
                <p>{`My RAY balance: ${balances[RaySolPool.baseMint] ?? 0}`}</p>
                <p>{`My SOL balance: ${solBalance}`}</p>
                <div>
                    Swap RAY Amount{' '}
                    <input
                        type="number"
                        onChange={(e) => {
                            setInputAmount(Number(e.target.value))
                        }}
                    ></input>
                </div>
                <p>{`Expected SOL amount: ${quoteAmountOut(new Fraction(Math.round(inputAmount * 1e6), 1e6), token1Amount, token2Amount).toFixed(2)}`}</p>
                <button disabled={!connected && true} /* not implemented */ onClick={swap}>
                    swap
                </button>
            </div>

            <p>{`pool RAY amount: ${token1Amount.toFixed(4)}`}</p>
            <p>{`pool SOL amount: ${token2Amount.toFixed(4)}`}</p>
        </>
    )
}
