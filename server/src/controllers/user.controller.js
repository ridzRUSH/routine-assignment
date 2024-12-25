const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("@prisma/client").PrismaClient;

const prismaClient = new prisma();

const SECRET_KEY = process.env.SECRET_KEY;

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);
  console.log(name, email, password, role);

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Ensure the password is hashed properly
    const hashedPassword = await bcrypt.hash(password, 6);
    const user = await prismaClient.user.create({
      data: { name, email, password: hashedPassword, role },
    });
    res.json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user: " + error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { user_id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

const getAllRoutines = async (req, res) => {
  try {
    const routines = await prismaClient.routine.findMany({
      include: { milestones: true, steps: true, dailyEvents: true },
    });
    res.json(routines);
  } catch (error) {
    res.status(500).json({ error: "Error fetching routines" });
  }
};

const markDailyActivity = async (req, res) => {
  const { activityId } = req.params;
  const { completed } = req.body;
  try {
    const dailyActivity = await prismaClient.dailyActivity.update({
      where: { activity_id: parseInt(activityId, 10) },
      data: { completed, completed_at: completed ? new Date() : null },
    });
    res.json(dailyActivity);
  } catch (error) {
    res.status(500).json({ error: "Error updating daily activity" });
  }
};

const userEngagementsDetails = async (req, res) => {
  const { userId } = req.params;
  try {
    const engagements = await prisma.routineEngagement.findMany({
      where: { user_id: parseInt(userId, 10) },
      include: { dailyActivities: true, routine: true },
    });
    res.json(engagements);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user engagements" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllRoutines,
  markDailyActivity,
  userEngagementsDetails,
};
