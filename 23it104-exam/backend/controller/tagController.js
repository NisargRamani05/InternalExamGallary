const Image = require('../models/Image');

// Get all tags with counts
exports.getAllTags = async (req, res) => {
  try {
    // Aggregate to get tags and their counts
    const tagCounts = await Image.aggregate([
      { $unwind: '$tags' },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: 1
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Add ids to match frontend type
    const tags = tagCounts.map((tag, index) => ({
      id: `tag-${index}`,
      name: tag.name,
      count: tag.count
    }));

    res.json({
      success: true,
      data: tags
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tags',
    });
  }
};