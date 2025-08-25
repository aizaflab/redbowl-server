import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
    port: process.env.PORT || 3000,
    database:process.env.DATABASE_URL,
    webEmail:process.env.WEB_EMAIL,
    webEmailPass:process.env.WEB_EMAIL_PASS,
    webEmailHost:process.env.WEM_HOST,
    NodeDev:process.env.NODE_DEV,
    bcryptSalt:process.env.BCRYPT_SALT_ROUNDS,
    jwtSecret:process.env.JWT_SECRET,
    //cloudinary 
    cloudName:process.env.CLOUD_NAME,
    apiKey:process.env.API_KEY,
    apiSecret:process.env.API_SECRET,
}