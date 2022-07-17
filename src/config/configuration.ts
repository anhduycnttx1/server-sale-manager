const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database_url: process.env.DATABASE_URL,
})
export default config
