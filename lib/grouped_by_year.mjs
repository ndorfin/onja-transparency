const RANGE_IN_YEARS = [
	2020,
	2021,
	2022,
	2023,
	2024,
];

function filterDateRangesByYear(dateRange, year) {
	let yearInDateRange = false;
	for (let range of dateRange) {
		if (range.end === 'today') range.end = new Date();

		let startYear = range.start.getFullYear();
		let endYear = range.end.getFullYear();

		if (year >= startYear && year <= endYear) {
			yearInDateRange = true;
			break;
		}
	}
	return yearInDateRange;
}

const groupedByYear = function(members) {
	let membersByYear = [];
	
	for (let year of RANGE_IN_YEARS) {
		let templateObj = {
			year: year,
			members: []
		}

		templateObj.members = members.filter(member => {
			let dateRange = null;
		
			if (member.clients) {
				// member is a dev
				let tempArray = [];
				member.clients.forEach(client => {
					tempArray.push(client);
				});
				dateRange = tempArray;
			} else if (member.employment) {
				// member is staff
				dateRange = member.employment;
			}

			if (!dateRange) return false;

			return filterDateRangesByYear(dateRange, year);
		});


		membersByYear.push(templateObj);
	}

	return membersByYear;
}

export default groupedByYear;