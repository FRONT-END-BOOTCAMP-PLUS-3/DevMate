export async function getMyProjects({
  userId,
  status = "ALL",
  filter = "CREATE",
}: {
  userId: string;
  status?: "ALL" | "RECRUITING" | "COMPLETED";
  filter?: "CREATE" | "LIKE" | "COMMENT" | "MEMBER";
}) {
  try {
    const query = new URLSearchParams({
      userId,
      status,
      filter,
    });

    const res = await fetch(`/api/project/myPage?${query.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.log("Error fetching projects:", error);
    return null;
  }
}
