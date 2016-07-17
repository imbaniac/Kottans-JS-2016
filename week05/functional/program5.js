function checkUsersValid(goodUsers) {
      return function allUsersValid(submittedUsers) {
        return submittedUsers.every( u => {
			return goodUsers.some( g => {
				return JSON.stringify(u) === JSON.stringify(g);
			})
		})
      };
    }
    module.exports = checkUsersValid
