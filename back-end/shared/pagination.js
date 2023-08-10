// Given provided page and size params, set pagination params
// Else, if not provided, set # of items/page as 5 and Page as 0
const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

//Given data model,data, page and limit, generate current page and total # of pages info
// return provided data with added pagination info
const paginateData = async (model, query, data, page, limit = 1) => {
  const result = {
    data: data,
  };
  const totalCount = await model.countDocuments(query);
  result.count = totalCount;
  result.currentPage = page ? page : 1;
  result.totalPages = Math.ceil(result.count / limit);

  return result;
};


const paginateDataClosestParks = async (
  unpaginatedData,
  page,
  limit = 1,
  offset
) => {
  const result = {
    data: unpaginatedData.slice(offset, offset + limit),
  };
  const totalCount = unpaginatedData.length;
  result.count = totalCount;
  result.currentPage = page ? page : 1;
  result.totalPages = Math.ceil(result.count / limit);

  return result;
};

module.exports = {
  getPagination: getPagination,
  paginateData: paginateData,
  paginateDataClosestParks: paginateDataClosestParks,
};
