const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");

// @desc Get goal
// @route GET /api/goals
// @access Private
const getGoal = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
});

// @desc Update goal
// @route PATCH /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const data = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!data) {
    res.status(400);
    throw new Error("Goal not found");
  }

  res.status(200).json(updatedGoal);
});

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const data = await Goal.findByIdAndDelete(req.params.id);

  if (!data) {
    res.status(400);
    throw new Error("Goal not found");
  }

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
