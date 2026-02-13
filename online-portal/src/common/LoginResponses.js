//LOGIN SUCCESS
export const MOCK_LOGIN_SUCCESS = {
  status: "success",
  message: "Login successful",
  data: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock.token", // Fake JWT
    user: {
      id: 1,
      name: "Pabodha Student",
      email: "student@uni.com",
      role: "USER",
    },
  },
};

//LOGIN FAILURE (Wrong Password)
export const MOCK_LOGIN_FAIL = {
  status: "error",
  message: "Invalid email or password",
  data: null,
};
