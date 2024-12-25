const prisma = require("@prisma/client").PrismaClient;

const prismaClient = new prisma();

// Create a daily event
const dayEvent = async (req, res) => {
  const { routineId } = req.params;
  const { week_number, day_number, event } = req.body;
  try {
    const dailyEvent = await prismaClient.dailyEvent.create({
      data: {
        routine_id: parseInt(routineId, 10),
        week_number,
        day_number,
        event,
      },
    });
    res.json(dailyEvent);
  } catch (error) {
    res.status(500).json({ error: "Error creating daily event" });
  }
};

// Fetch routine analytics
const analysis = async (req, res) => {
  const { routineId } = req.params;
  try {
    const analytics = await prismaClient.analytics.findUnique({
      where: { routine_id: parseInt(routineId, 10) },
    });
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: "Error fetching analytics" });
  }
};

// Post a new routine
const postRoutine = async (req, res) => {
  const { name, description, duration_weeks } = req.body;
  try {
    const routine = await prismaClient.routine.create({
      data: {
        name,
        description,
        duration_weeks,
      },
    });
    res.json(routine);
  } catch (error) {
    res.status(500).json({ error: "Error creating routine" });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  const { name, description, type } = req.body;
  try {
    const product = await prismaClient.product.create({
      data: {
        name,
        description,
        type,
      },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
};

// Associate a product with a routine step
const addProductToStepRoutine = async (req, res) => {
  const { stepId, productId } = req.body;
  try {
    const stepProduct = await prismaClient.routineStepProduct.create({
      data: {
        step_id: parseInt(stepId, 10),
        product_id: parseInt(productId, 10),
      },
    });
    res.json(stepProduct);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error associating product with step routine" });
  }
};

const addMilestone = async (req, res) => {
  const { routineId } = req.params;
  const { week_number, benefit } = req.body;

  try {
    // Validate input
    if (!week_number || !benefit) {
      return res
        .status(400)
        .json({ error: "Week number and benefit are required" });
    }

    // Create a new milestone
    const milestone = await prisma.routineMilestone.create({
      data: {
        routine_id: parseInt(routineId, 10),
        week_number,
        benefit,
      },
    });

    res
      .status(201)
      .json({ message: "Milestone added successfully", milestone });
  } catch (error) {
    console.error("Error adding milestone:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the milestone" });
  }
};

const addStepToRoutine = async (req, res) => {
  const { routineId } = req.params;
  const { step_name, description, order } = req.body;
  try {
    const step = await prisma.step.create({
      data: {
        routine_id: parseInt(routineId, 10),
        step_name,
        description,
        order,
      },
    });
    res.status(201).json(step);
  } catch (error) {
    res.status(500).json({ error: "Error adding step to routine" });
  }
};

module.exports = {
  dayEvent,
  analysis,
  postRoutine,
  addProduct,
  addProductToStepRoutine,
  addMilestone,
  addStepToRoutine,
};
