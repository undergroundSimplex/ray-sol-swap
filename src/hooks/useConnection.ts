import { Connection } from '@solana/web3.js'
import { useEffect, useState } from 'react'

export const useConnection = () => {
    const [connection, setConnection] = useState<Connection>()
    useEffect(() => {
        const newConnection = new Connection('https://solana-api.projectserum.com', 'confirmed')
        setConnection(newConnection)
    }, [])

    return { connection }
}
