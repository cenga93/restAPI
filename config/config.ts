import Joi from 'joi';

const envVarsSchema = Joi.object()
     .keys({
          JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(1440).description('minutes after which access tokens expire'), //24h
          JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
     })
     .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const config = {
     jwt: {
          accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
          refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
          resetPasswordExpirationMinutes: 10,
     },
};

export default config;
