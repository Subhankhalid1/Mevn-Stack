const successResponse = (data = [], message = "Success") => ({
  success: true,
  message,
  data,
});

const failureResponse=(message="Fail")=>({
  success:false,
  message

})

module.exports = {
  successResponse,
  failureResponse
};
