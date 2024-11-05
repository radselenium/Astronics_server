const prisma = require("../src/connection");

module.exports.getAllMessages = function (req, res) {
  prisma.messageTracing.findMany().then((msg) => {
    res.json(msg);
  });
};

module.exports.getOneMessage = function (req, res) {
  console.log(req.query);

  let whereClause = {}; // Initialize an empty whereClause object

  // Filter by date range if startDate and endDate are provided
  if (req.query.startDate && req.query.endDate) {
    whereClause.receivedDate = {
      gte: new Date(req.query.startDate),
      lte: new Date(req.query.endDate),
    };
  }

  // Filter by messageType if provided and it's not "All"
  if (req.query.messageType && req.query.messageType !== "All") {
    whereClause.messageType = req.query.messageType;
  }

  // Filter by documentId if provided
  if (req.query.documentId) {
    whereClause.documentID = req.query.documentId;
  }

  if (req.query.status && Array.isArray(req.query.status)) {
    whereClause.status = { in: req.query.status };
  } else {
    whereClause.status = req.query.status;
  }
  
  // Filter by source if provided
  if (req.query.messageSource) {
    whereClause.xmlMessageSource = req.query.messageSource;
  }

  if (req.query.productType) {
    whereClause.productType = req.query.productType;
  }

  // Use the whereClause for Prisma query
  prisma.messageTracing.findMany({
    where: whereClause,
    orderBy: {
      receivedDate: 'desc', // Order by receivedDate in descending order
    },
  })
  .then((msg) => {
    res.json(msg);
  })
  .catch((error) => {
    res.status(500).json({ error: 'An error occurred while retrieving messages' });
  });
};








module.exports.findByAggregateQuery = async (req, res) => {
  // Extract the date and xmlMessageSource from req.query
  const formattedStartDate = new Date(req.query.formattedStartDate);
  const formattedEndDate = new Date(req.query.formattedEndDate);
  
  // The where clause based on the query parameters
  let where = {
    receivedDate: {
      gte: formattedStartDate,
      lte: formattedEndDate,
    },
   // xmlMessageSource: req.query.xmlMessageSource,
  };
   // Conditionally add xmlMessageSource to where clause if MessageSource is not "BOTH"
   if (req.query.xmlMessageSource !== "All") {
    where.xmlMessageSource = req.query.xmlMessageSource; // Add xmlMessageSource conditionally
  }

  if (req.query.productType !== "All") {
    where.productType = req.query.productType; // Add xmlMessageSource conditionally
  }

  try {
    // 1. Query: Group by 'status' and count the number of records per status
    const statusCounts = await prisma.messageTracing.groupBy({
      by: ['status'],
      _count: {
        _all: true,
      },
      where: where,
    });

    // 2. Query: Count the total number of records matching the filter
    const overallCount = await prisma.messageTracing.count({
      where: where,
    });

    // Format the status counts
    const formattedStatusCounts = statusCounts.map((status) => ({
      status: status.status,
      count: status._count._all,
    }));

    // Combine the status counts and overall count in the final result
    const result = {
      statusCounts: formattedStatusCounts,
      overallCount: overallCount,
    };

    // Log the result and send the response
    console.log(result);
    res.send(result);
  } catch (err) {
    // Handle errors
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving MessageTracings.',
    });
  }
};




module.exports.findBymessageTypeAggregateQuery = async (req, res) => {
  // Extract the date range and xmlMessageSource from the request query
  const formattedStartDate = new Date(req.query.formattedStartDate);
  const formattedEndDate = new Date(req.query.formattedEndDate);
  const xmlMessageSource = req.query.xmlMessageSource;
  const productType = req.query.productType;

  // Create the where filter for the query
  const whereFilter = {
    receivedDate: {
      gte: formattedStartDate,
      lte: formattedEndDate,
    },
   // xmlMessageSource: xmlMessageSource,
  };
  // Conditionally add xmlMessageSource to where clause if MessageSource is not "BOTH"
  if (xmlMessageSource!== "All") {
    whereFilter.xmlMessageSource = xmlMessageSource; // Add xmlMessageSource conditionally
  }

  if (productType !== "All") {
    whereFilter.productType = req.query.productType; // Add xmlMessageSource conditionally
  }

  try {
    // Group by 'messageType' and count the occurrences of each message type
    const messageTypeCounts = await prisma.messageTracing.groupBy({
      by: ['messageType'],
      _count: {
        _all: true,
      },
      where: whereFilter, // Apply the filter based on receivedDate and xmlMessageSource
    });

    // Format the data to match the desired output structure
    const formattedData = messageTypeCounts.map(item => ({
      messageType: item.messageType,
      count: item._count._all,
    }));

    // Send the formatted data as the response
    res.send(formattedData);
  } catch (err) {
    // Handle any errors
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving MessageTracings.",
    });
  }
};



module.exports.findByAggregateQueryMessagePerDay = async (req, res) => {
  // Extract date range and xmlMessageSource from req.query
  const startDate = new Date(req.query.formattedStartDate);
  const endDate = new Date(req.query.formattedEndDate);
  const xmlMessageSource = req.query.xmlMessageSource;
  const productType = req.query.productType;
  console.log("check the startdate", startDate);
  console.log("check the enddate", endDate);
  
  // Generate the date array from startDate to endDate (inclusive)
  const dateArray = [];
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    dateArray.push(new Date(date));
  }

  try {
    // Fetch all messages within the date range and the specified xmlMessageSource
    const messages = await prisma.messageTracing.findMany({
      where: {
        receivedDate: {
          gte: startDate,
          lte: endDate,
        },
       // xmlMessageSource: xmlMessageSource,
        // Only include xmlMessageSource if it's not "BOTH"
    ...(xmlMessageSource !== "All" ? { xmlMessageSource: xmlMessageSource } : {}),
    ...(productType !== "All" ? { productType: productType } : {})
      },
    });

    // Create a map to count messages per day
    const countsPerDay = {};

    // Loop through messages and count them by date
    messages.forEach(message => {
      const dateKey = message.receivedDate.toISOString().split('T')[0]; // Get date part (YYYY-MM-DD)
      countsPerDay[dateKey] = (countsPerDay[dateKey] || 0) + 1; // Increment the count for that date
    });

    // Prepare the result based on the dateArray
    const mergedResult = dateArray.map(date => {
      const dateString = date.toISOString().split('T')[0];
      const count = countsPerDay[dateString] || 0; // Get the count or default to 0
      return { _id: dateString, count: count };
    });

    // Send the result back to the client
    res.send(mergedResult);

  } catch (error) {
    console.error(error);
    // Send error response if needed
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// module.exports.createUser = function (req, res) {
//   const { name, email, password } = req.body;
//   prisma.user
//     .create({
//       data: {
//         name,
//         email,
//         password,
//       },
//     })
//     .then((user) => {
//       res.json(user);
//     });
// };

// module.exports.updateUser = function (req, res) {
//   const { id } = req.params;
//   const { name, email } = req.body;
//   prisma.user
//     .update({
//       where: { id: Number(id) },
//       data: {
//         name,
//         email,
//       },
//     })
//     .then((user) => {
//       res.json(user);
//     });
// };

// module.exports.deleteUser = function (req, res) {
//   const { id } = req.params;
//   prisma.user
//     .delete({
//       where: { id: Number(id) },
//     })
//     .then((user) => {
//       res.json(user);
//     });
// };
