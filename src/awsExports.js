const awsExports = {
  Auth: {
    region: import.meta.env.AWS_REGION,
    userPoolId: import.meta.env.COGNITO_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.COGNITO_APP_CLIENT_ID,
  },
};

export default awsExports;