const headers = {
	"Content-Type": "application/json",
};

const authHeader = (token) => ({
	Authorization: `Bearer ${token}`,
	"Content-Type": "application/json",
});

export { headers, authHeader };
