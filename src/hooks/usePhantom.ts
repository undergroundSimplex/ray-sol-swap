import { PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'

export interface PhantomProvider {
    connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>
    disconnect: () => Promise<void>
    on: (event: PhantomEvent, callback: (args: any) => void) => void
    isPhantom: boolean
}

export type PhantomEvent = 'disconnect' | 'connect' | 'accountChanged'

export interface ConnectOpts {
    onlyIfTrusted: boolean
}

export type WindowWithSolana = Window & {
    solana?: PhantomProvider
}

export const usePhantom = () => {
    const [connected, setConnected] = useState(false)
    const [pubKey, setPubKey] = useState<PublicKey | null>(null)
    const [provider, setProvider] = useState<PhantomProvider | null>(null)
    const [walletAvail, setWalletAvail] = useState(false)

    useEffect(() => {
        if ('solana' in window) {
            const solWindow = window as WindowWithSolana
            if (solWindow?.solana?.isPhantom) {
                setProvider(solWindow.solana)
                setWalletAvail(true)
                // Attemp an eager connection
                solWindow.solana.connect({ onlyIfTrusted: true })
            }
        }
    }, [])

    useEffect(() => {
        provider?.on('connect', (publicKey: PublicKey) => {
            console.log(`connect event: ${publicKey}`)
            setConnected(true)
            setPubKey(publicKey)
        })
        provider?.on('disconnect', () => {
            console.log('disconnect event')
            setConnected(false)
            setPubKey(null)
        })
    }, [provider])

    const connectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log(`connect handler`)
        provider?.connect().catch((err) => {
            console.error('connect ERROR:', err)
        })
    }

    const disconnectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log('disconnect handler')
        provider?.disconnect().catch((err) => {
            console.error('disconnect ERROR:', err)
        })
    }

    return { connected, provider, walletAvail, pubKey, connectHandler, disconnectHandler }
}
