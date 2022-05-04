import { Connection, PublicKey } from '@solana/web3.js'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useBalance = (connection: Connection, pubKey: PublicKey, tokenMintAddresses: string[]) => {
    const [balances, setBalances] = useState<{ [key: string]: string }>({}) // mintAddr => display value
    const [solBalance, setSolBalance] = useState<string>('0') // display value

    // fetch SOL balance
    useEffect(() => {
        ;(async () => {
            if (!connection || !pubKey) return

            const bal = await connection.getBalance(pubKey)
            setSolBalance((bal / 1e9).toString())
        })()
    }, [connection, pubKey])

    // fetch token balances
    useEffect(() => {
        const query = async () => {
            if (!pubKey) return

            const response = await axios({
                url: `https://api.mainnet-beta.solana.com`,
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                data: tokenMintAddresses.map((mintAddr) => {
                    return {
                        jsonrpc: '2.0',
                        id: 1,
                        method: 'getTokenAccountsByOwner',
                        params: [
                            pubKey.toBase58(),
                            {
                                mint: mintAddr,
                            },
                            {
                                encoding: 'jsonParsed',
                            },
                        ],
                    }
                }),
            })

            const balances_ = {}
            for (const data of response.data) {
                const info = data.result.value[0].account.data.parsed.info
                balances_[info.mint] = info.tokenAmount.uiAmountString
            }
            setBalances(balances_)
        }

        query()
    }, [pubKey, tokenMintAddresses])

    return { balances, solBalance }
}
