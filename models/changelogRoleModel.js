import mongoose from "mongoose";

/**
 * @author Emil Waldemar Strand
 * @desc model for changelogRole-collection
 */
const changelogRoleSchema = mongoose.Schema({
	adminId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
	isAdmin: {
		type: String,
		required: true, 
	},
	
},
{
	timestamps: true,
}
);

const ChangelogRole = mongoose.model("changelogRole", changelogRoleSchema);

export default ChangelogRole;
