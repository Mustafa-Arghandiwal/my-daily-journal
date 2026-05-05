import crypto from "crypto"
import dotenv from "dotenv"
dotenv.config({ quiet: true })
const secret = process.env.ENCRYPTION_SECRET
const ALGORITHM = "aes-256-gcm"

const KEY = Buffer.from(secret!, "hex")

// Encrypts plain text into: iv:authTag:encryptedData
export function encrypt(text: string): string {
    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv)

    const encrypted = Buffer.concat([
        cipher.update(text, "utf8"),
        cipher.final()
    ])

    const authTag = cipher.getAuthTag()

    return [
        iv.toString("hex"),
        authTag.toString("hex"),
        encrypted.toString("hex")
    ].join(":")
}

// Decrypts iv:authTag:encryptedData back into plain text
export function decrypt(payload: string): string {
    const parts = payload.split(":")

    if (parts.length !== 3) {
        throw new Error("Invalid encrypted payload format")
    }

    const [ivHex, authTagHex, encryptedHex] = parts as [string, string, string]

    const iv = Buffer.from(ivHex, "hex")
    const authTag = Buffer.from(authTagHex, "hex")
    const encrypted = Buffer.from(encryptedHex, "hex")

    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv)
    decipher.setAuthTag(authTag)

    const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final()
    ])

    return decrypted.toString("utf8")
}
