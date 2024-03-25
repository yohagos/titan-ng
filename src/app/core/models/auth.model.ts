/*
{
    "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXZpZEBkYXZpZC5jb20iLCJpYXQiOjE3MDgwOTk5NjQsImV4cCI6MTcwODEwMDY4NH0.UHTWBg5l3H1JLHsTNjGlz21FokSn8JQCWMzCnA3X7PU",
    "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXZpZEBkYXZpZC5jb20iLCJpYXQiOjE3MDgwOTk5NjQsImV4cCI6MTcxNDE0Nzk2NH0.LRI0hPRf6-mfVFLE1wOUAwMgnR3Uj6j60_ccymsNTDc",
    "email": "david@david.com"
}
*/
export interface AuthModel {
  accessToken: string
  refreshToken: string
  email: string
}
