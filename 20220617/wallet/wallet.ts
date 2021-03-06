import { randomBytes } from 'crypto'
import elliptic from 'elliptic'

const ec = new elliptic.ec('secp256k1')

export class Wallet {
    public account: string
    public privateKey: string
    public publicKey: string
    public balance: number

    constructor() {
        this.privateKey = this.getPrivateKey()
        this.publicKey = this.getPublicKey()
        this.account = this.getAccount()
        this.balance = 0
    }

    private getPrivateKey(): string {
        return randomBytes(32).toString('hex')
    }

    private getPublicKey(): string {
        const keyPair = ec.keyFromPrivate(this.privateKey)
        return keyPair.getPublic().encode('hex', true)
    }

    private getAccount(): string {
        return Buffer.from(this.publicKey).slice(26).toString()
    }

    static getSignature(privateKey: string, data: string): string {
        const keyPair = ec.keyFromPrivate(privateKey)
        return keyPair.sign(data, 'hex').toDER('hex')
    }
}
