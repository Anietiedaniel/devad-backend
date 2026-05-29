const calculateProfileCompletion =
(user) => {

  let completed = 0;

  const total = 8;



  if (user.name) completed++;

  if (user.username) completed++;

  if (user.email) completed++;

  if (user.avatar) completed++;

  if (user.bio) completed++;

  if (user.phone) completed++;

  if (user.country) completed++;

  if (user.website) completed++;



  return Math.floor(
    (completed / total) * 100
  );
};

module.exports =
calculateProfileCompletion;

