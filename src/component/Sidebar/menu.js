const menu = [
	{
		id: 1,
		name: "dashboard",
		href: "/dashboard/home",
		permission: "",
	},
	{
		id: 2,
		name: "accounts",
		children: [
			{
				id: 1,
				name: "roles",
				permission: "get-roles",
				href: "/dashboard/accounts/roles",
			},
			{
				id: 2,
				name: "users",
				permission: "get-users",
				href: "/dashboard/accounts/users",
			},
			{
				id: 3,
				name: "investors",
				href: "/dashboard/accounts/investors",
				permission: "get-investors",
			},
		],
	},
	{
		id: 3,
		name: "basic",
		href: "/dashboard/basic",
		children: [
			{
				id: 1,
				name: "types",
				href: "/dashboard/basic/types",
				permission: "view-types",
			},
			{
				id: 2,
				name: "features",
				href: "/dashboard/basic/features",
				permission: "view-features",
			},
		],
	},
	{
		id: 6,
		name: "properties",
		href: "/dashboard/properties",
		permission: "view-properties",
	},
	{
		id: 77,
		name: "payments",
		href: "",
		children: [
			{
				id: 1,
				name: "investments",
				href: "/dashboard/payments/investments",
				permission: "view-investments",
			},
			{
				id: 2,
				name: "transactions",
				href: "/dashboard/payments/transactions",
				permission: "view-transactions",
			},
		],
	},
	{
		id: 44,
		name: "website",
		href: "/dashboard/website",
		permission: "edit-website-content",
	},
	{
		id: 48,
		name: "requests",
		href: "/dashboard/requests",
		permission: "edit-website-content",
	},
	{
		id: 7,
		name: "settings",
		href: "/dashboard/settings",
		permission: "",
	},
];

export default menu;
