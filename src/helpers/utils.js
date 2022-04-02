export const handleChange = (e, data, setData) => {
  const { name, value } = e.target;
  setData({ ...data, [name]: value });
};

export const handleError = (error) => {
  console.log(error);
};
