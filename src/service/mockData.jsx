const mockGroupData = {
	name: 'Experis Academy',
	createdBy: 'John',
	createdAt: '2023-10-01',
	activities: [
		{
			id: 1,
			title: 'Table Tennis',
			leaderboard: [
				{ name: 'Ali', elo: 1500 },
				{ name: 'John', elo: 1450 },
				{ name: 'Ludvig', elo: 1400 },
				{ name: 'Ibbi', elo: 1350 },
				{ name: 'Ateeb', elo: 1300 },
			],
		},
		{
			id: 2,
			title: 'Chess',
			leaderboard: [
				{ name: 'Espen', elo: 1550 },
				{ name: 'Steven', elo: 1500 },
				{ name: 'Ali', elo: 1450 },
				{ name: 'John', elo: 1400 },
				{ name: 'Ludvig', elo: 1350 },
			],
		},
		{
			id: 3,
			title: 'Shuffleboard',
			leaderboard: [
				{ name: 'Ibbi', elo: 1600 },
				{ name: 'Ateeb', elo: 1550 },
				{ name: 'Espen', elo: 1500 },
				{ name: 'Steven', elo: 1450 },
				{ name: 'Ali', elo: 1400 },
			],
		},
	],
	recentMatches: [
		{
			id: 1,
			activity: 'Table Tennis',
			players: ['Ali', 'John'],
			date: '2023-10-10',
		},
		{
			id: 2,
			activity: 'Chess',
			players: ['Espen', 'Steven'],
			date: '2023-10-11',
		},
		{
			id: 3,
			activity: 'Shuffleboard',
			players: ['Ibbi', 'Ateeb'],
			date: '2023-10-12',
		},
	],
};

export { mockGroupData };
