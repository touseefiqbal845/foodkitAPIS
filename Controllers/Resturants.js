const Resturant = require("../modals/Resturants/ResturantList");

exports.createResturant = async (req, res) => {
  try {
    const resturant = new Resturant(req.body);
    await resturant.save();
    res.status(201).send(resturant);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllResturants = async (req, res) => {
  try {
    const restaurants = await Resturant.find({});
    res.status(200).json({
      restaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurants or running aggregation:", error);
    res.status(500).send(error);
  }
};

exports.getResturantById = async (req, res) => {
  try {
    const resturant = await Resturant.findById(req.params.id);
    if (!resturant) {
      return res.status(404).send();
    }
    res.status(200).send(resturant);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateResturantById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "brand_id",
    "code",
    "latitude",
    "longitude",
    "minimum_order",
    "opening_hour_slots",
    "logo_images",
    "banner_images",
    "categories",
    "locales",
    "is_realtime_enabled",
    "is_scheduled_enabled",
    "phone_number",
    "email",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const resturant = await Resturant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!resturant) {
      return res.status(404).send();
    }
    res.status(200).send(resturant);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteResturantById = async (req, res) => {
  try {
    const resturant = await Resturant.findByIdAndDelete(req.params.id);
    if (!resturant) {
      return res.status(404).send();
    }
    res.status(200).send(resturant);
  } catch (error) {
    res.status(500).send(error);
  }
};



// async function runAggregation() {
//   try {
//     const result = await Resturant.aggregate([
//       {
//         $facet: {
//           averageMinimumOrder: [
//             {
//               $group: {
//                 _id: null,
//                 averageOrder: { $avg: "$minimum_order" },
//               },
//             },
//           ],
//           totalDocuments: [
//             {
//               $count: "totalCount",
//             },
//           ],
//           documentsByCity: [
//             {
//               $group: {
//                 _id: "$locales.en.city",
//                 count: { $sum: 1 },
//               },
//             },
//             {
//               $sort: { count: -1 },
//             },
//           ],
//           uniqueBrandIds:[ 
//             {
//               $group: {
//                 _id: null,
//                 uniqueBrands: { $addToSet: "$brand_id" },
//               },
//             },
//           ],
//         },
//       },
//       {
//         $project: {
//           averageMinimumOrder: {
//             $arrayElemAt: ["$averageMinimumOrder.averageOrder", 0],
//           },
//           totalDocuments: { $arrayElemAt: ["$totalDocuments.totalCount", 0] },
//           documentsByCity: 1,
//           uniqueBrandIds: { $arrayElemAt: ["$uniqueBrandIds.uniqueBrands", 0] },
//         },
//       },
//     ]);


//     console.log(result);
//   } catch (error) {
//     console.error("Error running aggregation:", error);
//   }
// }

// runAggregation();
