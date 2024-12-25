const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// Helper function to handle API responses
const handleResponse = async (response) => {
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message || "Something went wrong!");
  }
  return responseBody;
};

// API calls
export const register = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return handleResponse(response);
};

export const login = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return handleResponse(response);
};

export const fetchRoutines = async () => {
  const response = await fetch(`${API_BASE_URL}/api/routines`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(response);
};

export const fetchRoutineAnalytics = async (routineId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/routines/${routineId}/analytics`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return handleResponse(response);
};

export const addDailyEvent = async (routineId, data) => {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/routines/${routineId}/daily-events`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return handleResponse(response);
};

export const addMilestone = async (routineId, milestoneData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/routines/${routineId}/milestones`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(milestoneData),
    }
  );
  return handleResponse(response);
};

export const fetchUserEngagements = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/users/${userId}/engagements`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return handleResponse(response);
};

export const markDailyActivity = async (activityId, data) => {
  const response = await fetch(
    `${API_BASE_URL}/api/daily-activities/${activityId}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return handleResponse(response);
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
    method: "POST",
    credentials: "include",
  });
  return handleResponse(response);
};
