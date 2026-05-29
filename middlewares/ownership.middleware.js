const ownership =
(
  model
) => {

  return async (
    req,
    res,
    next
  ) => {

    const resource =
    await model.findById(
      req.params.id
    );



    if (!resource) {

      return res.status(404)
      .json({

        success: false,

        message:
        'Resource not found',

      });
    }



    if (

      resource.user.toString()
      !==
      req.user._id.toString()

    ) {

      return res.status(403)
      .json({

        success: false,

        message:
        'Unauthorized',

      });
    }



    next();
  };
};

module.exports =
ownership;