"use strict"
import dotenv from "dotenv";
import Joi from "joi";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../.env") });
const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid("production", "development", "test").required(),
        PORT: Joi.number().positive().required(),
        MONGO_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required().description("637 Api secret")
    })
    .unknown()
const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env)
if (error) {
    throw new Error(`Config Validation Error: ${error.message}`);
}
export default {
    environment: envVars.NODE_ENV, port: envVars.PORT, mongoURL: envVars.MONGO_URL, secret: envVars.JWT_SECRET
}