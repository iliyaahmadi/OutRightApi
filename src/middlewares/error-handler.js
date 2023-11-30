const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const prodErrors = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'something went wrong!',
    });
  }
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === 'production') {
    //error for uuid
    if (error.parent.code == '22P02') {
      return res.status(400).json({
        status: 'bad request',
        message: 'ایدی وارد شده صحیح نمیباشد',
      });
    } else if (error.parent.code == '23503') {
      return res.status(400).json({
        status: 'bad request',
        message: 'ایدی انتیتی داده شده وجود ندارد',
      });
    }
    prodErrors(res, error);
  }
};
