import { usePhantom } from '../hooks/usePhantom'

export const Connect2Phantom = () => {
    const { connected, walletAvail, pubKey, connectHandler, disconnectHandler } = usePhantom()

    return (
        <div>
            {walletAvail ? (
                <div>
                    <button style={{ display: 'block', margin: 'auto' }} disabled={connected} onClick={connectHandler}>
                        Connect to Phantom
                    </button>

                    <button style={{ display: 'block', margin: 'auto' }} disabled={!connected} onClick={disconnectHandler}>
                        Disconnect from Phantom
                    </button>
                    <p>{connected ? <p>My wallet is {pubKey?.toBase58()}</p> : null}</p>
                </div>
            ) : (
                <>
                    <p>
                        Opps!!! Phantom is not available. Go get it <a href="https://phantom.app/">https://phantom.app/</a>.
                    </p>
                </>
            )}
        </div>
    )
}

export default Connect2Phantom
