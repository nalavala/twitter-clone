export default  {
  db: process.env.DB_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  tokenIssuer: process.env.TOKEN_ISSUER || "",
  tokenAudience: process.env.TOKEN_AUDIENCE || "",
  port: process.env.PORT || 1234
};
